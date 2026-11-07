import { NextResponse } from 'next/server';
import { getProperties, createProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || searchParams.get('q') || '';
    const status = searchParams.get('status') || 'all';
    const transaction = searchParams.get('transaction') || searchParams.get('mode') || 'all';
    const category = searchParams.get('category') || searchParams.get('type') || 'all';
    const wilaya = searchParams.get('wilaya') || 'all';
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'recent';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const result = await getProperties({
      search,
      status,
      transaction,
      category,
      wilaya,
      featured,
      sort,
      page,
      limit
    });

    return NextResponse.json({
      success: true,
      properties: result.properties,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      counts: result.counts
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (err) {
    console.error('GET /api/properties error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la récupération des propriétés.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Authorization check
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    // 2. Parse & Validate input
    const body = await request.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Le titre de la propriété est requis.' }, { status: 400 });
    }
    if (!body.transaction_type || !['vente', 'location'].includes(body.transaction_type)) {
      return NextResponse.json({ success: false, error: 'Type de transaction invalide (vente ou location).' }, { status: 400 });
    }
    if (body.price === undefined || isNaN(Number(body.price)) || Number(body.price) < 0) {
      return NextResponse.json({ success: false, error: 'Le prix doit être un nombre positif.' }, { status: 400 });
    }

    const priceNum = Number(body.price);
    const priceFormatted = `${priceNum.toLocaleString('fr-FR')} DA${body.transaction_type === 'location' ? '/mois' : ''}`;

    const newProperty = await createProperty({
      title: body.title.trim(),
      title_ar: body.title_ar || '',
      tagline: body.tagline || '',
      description: body.description || '',
      description_ar: body.description_ar || '',
      transaction_type: body.transaction_type,
      category_id: body.category_id || null,
      category_name: body.category_name || 'Villa Contemporaine',
      price: priceNum,
      price_formatted: body.price_formatted || priceFormatted,
      price_period: body.price_period || (body.transaction_type === 'location' ? 'month' : null),
      price_negotiable: Boolean(body.price_negotiable),
      currency: body.currency || 'DZD',
      wilaya_code: body.wilaya_code ? Number(body.wilaya_code) : null,
      wilaya_name: body.wilaya_name || 'Alger',
      commune: body.commune || 'Hydra',
      address: body.address || '',
      cadastral_section: body.cadastral_section || '',
      cadastral_number: body.cadastral_number || '',
      surface_habitable: Number(body.surface_habitable || body.surface || 0),
      surface_terrain: Number(body.surface_terrain || body.landSurface || 0),
      bedrooms: parseInt(body.bedrooms || 0, 10),
      bathrooms: parseInt(body.bathrooms || 0, 10),
      living_rooms: parseInt(body.living_rooms || body.livingRooms || 0, 10),
      garage_spaces: parseInt(body.garage_spaces || body.garages || 0, 10),
      floors: parseInt(body.floors || 1, 10),
      year_built: body.year_built ? parseInt(body.year_built, 10) : null,
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      legal_status: body.legal_status || body.legalStatus || 'Acte notarié & Livret foncier',
      ownership_info: body.ownership_info || {},
      publication_status: body.publication_status || 'publie',
      is_featured: Boolean(body.is_featured),
      featured_order: body.featured_order ? parseInt(body.featured_order, 10) : null,
      is_exclusive: Boolean(body.is_exclusive),
      is_demo: false,
      is_sold: Boolean(body.is_sold),
      is_rented: Boolean(body.is_rented),
      owner_name: body.owner_name || 'Direction Prime House',
      owner_phone: body.owner_phone || '+213 23 45 67 89',
      owner_email: body.owner_email || 'mandats@primehouse-dz.com',
      owner_type: body.owner_type || 'direction',
      agent_id: body.agent_id || null,
      main_image: body.main_image || (Array.isArray(body.images) && body.images.length > 0 ? body.images[0] : ''),
      images: Array.isArray(body.images) ? body.images : [],
      video_url: body.video_url || '',
      virtual_tour_url: body.virtual_tour_url || '',
      created_by: auth.user.id
    }, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Propriété créée avec succès.',
      property: newProperty
    }, { status: 201 });
  } catch (err) {
    console.error('POST /api/properties error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la création de la propriété.' },
      { status: 500 }
    );
  }
}
