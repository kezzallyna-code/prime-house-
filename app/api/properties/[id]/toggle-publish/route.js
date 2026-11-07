import { NextResponse } from 'next/server';
import { togglePublishProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const updated = await togglePublishProperty(id, auth.user);

    return NextResponse.json({
      success: true,
      message: updated.publication_status === 'publie' ? 'Propriété publiée sur la vitrine publique.' : 'Propriété passée en brouillon.',
      publication_status: updated.publication_status,
      property: updated
    });
  } catch (err) {
    console.error('toggle-publish error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors du changement de statut.' },
      { status: 500 }
    );
  }
}
