import { NextResponse } from 'next/server';
import { getProperties } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator']);
    if (!auth.authorized) return auth.response;

    const { properties } = await getProperties({ limit: 1000 });

    const headers = [
      'Référence',
      'Titre',
      'Catégorie',
      'Transaction',
      'Prix (DZD)',
      'Wilaya',
      'Commune',
      'Surface Habitable (m²)',
      'Chambres',
      'Salles de bain',
      'Statut Publication',
      'En Vitrine',
      'Vues',
      'Date Création'
    ];

    const escapeCsv = (str) => {
      const s = String(str ?? '').replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = properties.map((p) => [
      escapeCsv(p.ref),
      escapeCsv(p.title),
      escapeCsv(p.category_name),
      escapeCsv(p.transaction_type),
      escapeCsv(p.price),
      escapeCsv(p.wilaya_name),
      escapeCsv(p.commune),
      escapeCsv(p.surface_habitable),
      escapeCsv(p.bedrooms),
      escapeCsv(p.bathrooms),
      escapeCsv(p.publication_status),
      escapeCsv(p.is_featured ? 'Oui' : 'Non'),
      escapeCsv(p.views_count),
      escapeCsv(p.created_at)
    ]);

    const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

    return new Response('\uFEFF' + csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="prime_house_properties_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error('export error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l’export CSV.' },
      { status: 500 }
    );
  }
}
