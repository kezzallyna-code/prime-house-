import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteSettings, updateSiteSetting } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('GET /api/settings error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lecture paramètres.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin']);
    if (!auth.authorized) return auth.response;

    const body = await request.json();

    // Body can be { key: 'agency', value: { ... } } or multiple keys { agency: {...}, social: {...} }
    if (body.key && body.value !== undefined) {
      await updateSiteSetting(body.key, body.value, auth.user);
    } else {
      for (const [k, v] of Object.entries(body)) {
        await updateSiteSetting(k, v, auth.user);
      }
    }

    // Step 10: Next.js Cache Revalidation after CMS update
    try {
      revalidatePath('/');
      revalidatePath('/contact');
      revalidatePath('/a-propos');
      revalidatePath('/biens');
    } catch (e) {
      // Ignored if outside request context
    }

    const updatedSettings = await getSiteSettings();

    return NextResponse.json({
      success: true,
      message: 'Paramètres du site mis à jour avec succès.',
      settings: updatedSettings
    });
  } catch (err) {
    console.error('PUT /api/settings error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur mise à jour paramètres.' },
      { status: 500 }
    );
  }
}
