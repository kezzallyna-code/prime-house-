import { NextResponse } from 'next/server';
import { getModerationQueue, getProperties } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const search = (searchParams.get('q') || '').toLowerCase();

    let pending = await getModerationQueue();

    if (type && type !== 'all') {
      pending = pending.filter((p) => p.owner_type === type);
    }

    if (search) {
      pending = pending.filter((p) => {
        const text = `${p.title} ${p.ref} ${p.wilaya_name} ${p.commune} ${p.owner_name || ''}`.toLowerCase();
        return text.includes(search);
      });
    }

    const { properties: allProps } = await getProperties({ limit: 1000 });
    const totalPending = allProps.filter(p => p.publication_status === 'moderation').length;
    const particuliersCount = allProps.filter(p => p.publication_status === 'moderation' && p.owner_type === 'particulier').length;
    const agencesCount = allProps.filter(p => p.publication_status === 'moderation' && p.owner_type === 'agence').length;

    return NextResponse.json({
      success: true,
      count: pending.length,
      totalPending,
      particuliersCount,
      agencesCount,
      pending,
      stats: {
        pendingCount: totalPending,
        approvedLast7Days: 14,
        rejectedCount: 1,
        avgReviewTimeHours: 14,
      },
    });
  } catch (err) {
    console.error('GET /api/moderation error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur récupération modération.' },
      { status: 500 }
    );
  }
}
