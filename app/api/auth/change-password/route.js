import { NextResponse } from 'next/server';
import { requireAdmin, hashPassword, verifyPassword } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { logAuditEvent } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const body = await request.json();
    const currentPassword = String(body.currentPassword || body.current_password || '').trim();
    const newPassword = String(body.newPassword || body.new_password || '').trim();

    if (!currentPassword) {
      return NextResponse.json({ success: false, error: 'Mot de passe actuel obligatoire.' }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'Le nouveau mot de passe doit comporter au moins 8 caractères.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', auth.user.id)
      .single();

    if (error || !user) {
      return NextResponse.json({ success: false, error: 'Compte administrateur introuvable.' }, { status: 404 });
    }

    const isCurrentValid = verifyPassword(currentPassword, user.password_hash);
    if (!isCurrentValid) {
      return NextResponse.json({ success: false, error: 'Mot de passe actuel incorrect.' }, { status: 401 });
    }

    const newHash = hashPassword(newPassword);
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({
        password_hash: newHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Password update error:', updateError);
      return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour.' }, { status: 500 });
    }

    await logAuditEvent({
      userId: user.id,
      userEmail: user.email,
      action: 'ADMIN_PASSWORD_CHANGE',
      entityType: 'admin_user',
      entityId: user.id,
      details: { email: user.email, timestamp: new Date().toISOString() }
    });

    return NextResponse.json({
      success: true,
      message: 'Votre mot de passe a été modifié avec succès.'
    });
  } catch (err) {
    console.error('POST /api/auth/change-password error:', err);
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}

