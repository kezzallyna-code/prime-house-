import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import database from '@/data/database.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || searchParams.get('q') || '').toLowerCase().trim();
    const status = searchParams.get('status') || 'all'; // 'all' | 'publie' | 'moderation' | 'brouillon' | 'archive'
    const transaction = searchParams.get('transaction') || searchParams.get('mode') || 'all'; // 'all' | 'vente' | 'location'
    const category = searchParams.get('category') || searchParams.get('type') || 'all';
    const wilaya = searchParams.get('wilaya') || 'all';
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'recent';

    let list = [...(database.properties || [])];

    // Filter status
    if (status && status !== 'all') {
      list = list.filter((p) => p.publication_status === status);
    }

    // Filter transaction
    if (transaction && transaction !== 'all') {
      list = list.filter((p) => p.transaction_type === transaction);
    }

    // Filter category
    if (category && category !== 'all') {
      list = list.filter((p) => {
        const cat = (p.category_name || '').toLowerCase();
        const catId = (p.category_id || '').toLowerCase();
        const qCat = category.toLowerCase();
        return cat.includes(qCat) || catId.includes(qCat);
      });
    }

    // Filter wilaya
    if (wilaya && wilaya !== 'all') {
      list = list.filter((p) => {
        if (!isNaN(wilaya)) {
          return Number(p.wilaya_code) === Number(wilaya);
        }
        return (p.wilaya_name || '').toLowerCase() === wilaya.toLowerCase();
      });
    }

    // Filter featured
    if (featured === 'true') {
      list = list.filter((p) => Boolean(p.is_featured));
    }

    // Filter search text
    if (search) {
      list = list.filter((p) => {
        const text = `${p.ref} ${p.title} ${p.wilaya_name} ${p.commune} ${p.owner_name || ''} ${p.address || ''}`.toLowerCase();
        return text.includes(search);
      });
    }

    // Sort
    if (sort === 'price_desc') {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sort === 'price_asc') {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sort === 'views') {
      list.sort((a, b) => (Number(b.views_count) || 0) - (Number(a.views_count) || 0));
    } else {
      // Recent first
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    const allProps = database.properties || [];
    const counts = {
      all: allProps.length,
      published: allProps.filter((p) => p.publication_status === 'publie').length,
      moderation: allProps.filter((p) => p.publication_status === 'moderation').length,
      drafts: allProps.filter((p) => p.publication_status === 'brouillon').length,
      archived: allProps.filter((p) => p.publication_status === 'archive').length,
      featured: allProps.filter((p) => Boolean(p.is_featured)).length,
    };

    return NextResponse.json(
      {
        success: true,
        properties: list,
        total: list.length,
        counts,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des biens.', properties: [], total: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Le titre et le prix sont obligatoires.' },
        { status: 400 }
      );
    }

    const newId = `prop-${Date.now()}`;
    const newRef = body.ref || `PH-ALG-${Math.floor(100 + Math.random() * 900)}`;

    const newProperty = {
      id: newId,
      ref: newRef,
      title: body.title,
      title_ar: body.title_ar || '',
      tagline: body.tagline || '',
      description: body.description || '',
      description_ar: body.description_ar || '',
      transaction_type: body.transaction_type || 'vente',
      category_id: body.category_id || 'cat-01',
      category_name: body.category_name || 'Villa Contemporaine',
      price: Number(body.price),
      price_formatted: `${Number(body.price).toLocaleString('fr-FR')} DA`,
      price_period: body.price_period || null,
      price_negotiable: Boolean(body.price_negotiable),
      wilaya_code: Number(body.wilaya_code) || 16,
      wilaya_name: body.wilaya_name || 'Alger',
      commune: body.commune || 'Hydra',
      address: body.address || '',
      cadastral_section: body.cadastral_section || '',
      cadastral_number: body.cadastral_number || '',
      surface_habitable: Number(body.surface_habitable) || 0,
      surface_terrain: Number(body.surface_terrain) || 0,
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      garage_spaces: Number(body.garage_spaces) || 0,
      floors: Number(body.floors) || 1,
      year_built: Number(body.year_built) || new Date().getFullYear(),
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      legal_status: body.legal_status || 'Acte notarié & Livret foncier individuel',
      publication_status: body.publication_status || 'publie',
      is_featured: Boolean(body.is_featured),
      featured_order: body.featured_order || null,
      owner_name: body.owner_name || 'Direction Prime House',
      owner_phone: body.owner_phone || '+213 23 45 67 89',
      owner_email: body.owner_email || 'direction@primehouse-dz.com',
      owner_type: body.owner_type || 'direction',
      main_image: body.main_image || '/assets/logo-p-transparent.png',
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.main_image || '/assets/logo-p-transparent.png'],
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_demo: false,
    };

    database.properties = database.properties || [];
    database.properties.unshift(newProperty);

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Bien ajouté avec succès.',
        property: newProperty,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de l'enregistrement du bien." },
      { status: 500 }
    );
  }
}
