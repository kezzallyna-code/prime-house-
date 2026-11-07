import { NextResponse } from 'next/server';
import { moderateProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const reason = body.reason || 'Conforme aux standards de prestige Prime House';
    const notes = body.notes || '';

    const property = await moderateProperty(id, 'approved', reason, notes, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Annonce approuvée et publiée avec succès.',
      property
    });
  } catch (err) {
    console.error('approve error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de l’approbation.' },
      { status: 500 }
    );
  }
}
