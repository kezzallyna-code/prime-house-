import { NextResponse } from 'next/server';
import { getVisits, createVisit } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    const visits = await getVisits({ status });

    return NextResponse.json({
      success: true,
      visits,
      total: visits.length
    });
  } catch (err) {
    console.error('GET /api/visits error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des visites.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const body = await request.json();

    if (!body.client_name || !body.client_phone || !body.scheduled_at) {
      return NextResponse.json(
        { success: false, error: 'Nom client, téléphone et date de visite requis.' },
        { status: 400 }
      );
    }

    const visit = await createVisit({
      inquiry_id: body.inquiry_id || null,
      property_id: body.property_id || null,
      scheduled_at: new Date(body.scheduled_at).toISOString(),
      status: body.status || 'Programmee',
      escort_agent: body.escort_agent || auth.user.full_name,
      client_name: body.client_name,
      client_phone: body.client_phone,
      notes: body.notes || ''
    }, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Visite programmée avec succès.',
      visit
    }, { status: 201 });
  } catch (err) {
    console.error('POST /api/visits error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur planification visite.' },
      { status: 500 }
    );
  }
}

