import { NextResponse } from 'next/server';
import { moderateProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const reason = body.reason || 'Dossier incomplet ou non conforme aux critères de luxe';
    const notes = body.notes || '';

    const property = await moderateProperty(id, 'rejected', reason, notes, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Annonce rejetée avec succès.',
      property
    });
  } catch (err) {
    console.error('reject error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors du rejet.' },
      { status: 500 }
    );
  }
}
