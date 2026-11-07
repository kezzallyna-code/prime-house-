import { NextResponse } from 'next/server';
import { toggleFeaturedProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const updated = await toggleFeaturedProperty(id, auth.user);

    return NextResponse.json({
      success: true,
      message: updated.is_featured ? 'Propriété ajoutée aux coups de cœur.' : 'Propriété retirée des coups de cœur.',
      is_featured: updated.is_featured,
      property: updated
    });
  } catch (err) {
    console.error('toggle-featured error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la modification vitrine.' },
      { status: 500 }
    );
  }
}
