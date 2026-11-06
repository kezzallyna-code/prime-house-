import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'particulier' | 'agence' | null
    const search = (searchParams.get('q') || '').toLowerCase();

    const properties = database.properties || [];
    let pending = properties.filter((p) => p.publication_status === 'moderation');

    if (type && type !== 'all') {
      pending = pending.filter((p) => p.owner_type === type);
    }

    if (search) {
      pending = pending.filter((p) => {
        const text = `${p.title} ${p.ref} ${p.wilaya_name} ${p.commune} ${p.owner_name || ''}`.toLowerCase();
        return text.includes(search);
      });
    }

    const particuliersCount = (database.properties || []).filter(
      (p) => p.publication_status === 'moderation' && p.owner_type === 'particulier'
    ).length;

    const agencesCount = (database.properties || []).filter(
      (p) => p.publication_status === 'moderation' && p.owner_type === 'agence'
    ).length;

    return NextResponse.json(
      {
        success: true,
        count: pending.length,
        totalPending: (database.properties || []).filter((p) => p.publication_status === 'moderation').length,
        particuliersCount,
        agencesCount,
        pending,
        stats: {
          pendingCount: (database.properties || []).filter((p) => p.publication_status === 'moderation').length,
          approvedLast7Days: 14,
          rejectedCount: 1,
          avgReviewTimeHours: 14,
        },
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching moderation properties:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des biens en modération.',
        pending: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
