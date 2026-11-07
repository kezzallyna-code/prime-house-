import { NextResponse } from 'next/server';
import { duplicateProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const duplicated = await duplicateProperty(id, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Propriété dupliquée avec succès.',
      property: duplicated
    });
  } catch (err) {
    console.error('duplicate error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la duplication.' },
      { status: 500 }
    );
  }
}
