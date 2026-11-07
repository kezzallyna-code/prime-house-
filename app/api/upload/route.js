import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/auth';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_DOC_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();
    const file = formData.get('file');
    const bucket = formData.get('bucket') || 'properties';
    const folder = formData.get('folder') || 'listings';

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni pour le téléversement.' },
        { status: 400 }
      );
    }

    // Validate bucket
    if (!['properties', 'documents'].includes(bucket)) {
      return NextResponse.json(
        { success: false, error: 'Nom de bucket non autorisé.' },
        { status: 400 }
      );
    }

    const mimeType = file.type || 'application/octet-stream';
    const size = file.size;

    if (bucket === 'properties') {
      if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { success: false, error: 'Format d’image non supporté. Formats acceptés : JPEG, PNG, WEBP.' },
          { status: 400 }
        );
      }
      if (size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { success: false, error: 'L’image dépasse la taille maximale autorisée (10 Mo).' },
          { status: 400 }
        );
      }
    } else if (bucket === 'documents') {
      if (!ALLOWED_DOC_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { success: false, error: 'Format de document non supporté. Formats acceptés : PDF, JPEG, PNG.' },
          { status: 400 }
        );
      }
      if (size > MAX_DOC_SIZE) {
        return NextResponse.json(
          { success: false, error: 'Le document dépasse la taille maximale autorisée (25 Mo).' },
          { status: 400 }
        );
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop()?.toLowerCase() || (mimeType === 'application/pdf' ? 'pdf' : 'jpg');
    const uniqueFileName = `${Date.now()}_${crypto.randomBytes(6).toString('hex')}.${ext}`;
    const storagePath = `${folder}/${uniqueFileName}`;

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: false
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json(
        { success: false, error: `Erreur de stockage: ${error.message}` },
        { status: 500 }
      );
    }

    // Compute URL
    let publicUrl = '';
    if (bucket === 'properties') {
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(storagePath);
      publicUrl = publicData?.publicUrl || '';
    } else {
      // Signed URL for private documents
      const { data: signedData } = await supabase.storage.from(bucket).createSignedUrl(storagePath, 3600); // 1 hour
      publicUrl = signedData?.signedUrl || '';
    }

    return NextResponse.json({
      success: true,
      message: 'Fichier téléversé avec succès dans Supabase Storage.',
      bucket,
      path: storagePath,
      url: publicUrl,
      fileName: file.name,
      fileSize: size
    });
  } catch (err) {
    console.error('POST /api/upload error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement du téléversement.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const bucket = searchParams.get('bucket') || 'properties';
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ success: false, error: 'Chemin du fichier requis.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Storage delete error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Fichier supprimé de Supabase Storage.'
    });
  } catch (err) {
    console.error('DELETE /api/upload error:', err);
    return NextResponse.json({ success: false, error: 'Erreur suppression.' }, { status: 500 });
  }
}

