import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const properties = database.properties || [];
    let csv = 'RÉFÉRENCE;TITRE;TRANSACTION;CATÉGORIE;WILAYA;COMMUNE;PRIX_DA;SURFACE_M2;CHAMBRES;STATUT;À_LA_UNE;DATE_CREATION\n';

    properties.forEach((p) => {
      const ref = (p.ref || '').replace(/;/g, ' ');
      const title = (p.title || '').replace(/;/g, ' ');
      const trans = p.transaction_type === 'vente' ? 'Vente' : 'Location';
      const cat = (p.category_name || '').replace(/;/g, ' ');
      const wilaya = (p.wilaya_name || '').replace(/;/g, ' ');
      const commune = (p.commune || '').replace(/;/g, ' ');
      const price = p.price || 0;
      const surface = p.surface_habitable || 0;
      const rooms = p.bedrooms || 0;
      const status = p.publication_status || 'brouillon';
      const featured = p.is_featured ? 'Oui' : 'Non';
      const date = p.created_at ? new Date(p.created_at).toLocaleDateString('fr-FR') : '';

      csv += `"${ref}";"${title}";"${trans}";"${cat}";"${wilaya}";"${commune}";${price};${surface};${rooms};"${status}";"${featured}";"${date}"\n`;
    });

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="registre-foncier-prime-house-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting properties:', error);
    return NextResponse.json({ success: false, error: 'Erreur lors de l’export CSV.' }, { status: 500 });
  }
}
