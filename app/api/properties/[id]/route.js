import { NextResponse } from 'next/server';
import { getPropertyById, updateProperty, deleteProperty } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const property = await getPropertyById(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      property
    });
  } catch (err) {
    console.error(`GET /api/properties/${params?.id} error:`, err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la propriété.' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const existing = await getPropertyById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable.' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates = {};

    const allowedFields = [
      'title', 'title_ar', 'tagline', 'description', 'description_ar',
      'transaction_type', 'category_id', 'category_name', 'price', 'price_formatted',
      'price_period', 'price_negotiable', 'currency', 'wilaya_code', 'wilaya_name',
      'commune', 'address', 'cadastral_section', 'cadastral_number',
      'surface_habitable', 'surface_terrain', 'bedrooms', 'bathrooms', 'living_rooms',
      'garage_spaces', 'floors', 'year_built', 'amenities', 'legal_status',
      'ownership_info', 'publication_status', 'is_featured', 'featured_order',
      'is_exclusive', 'is_sold', 'is_rented', 'owner_name', 'owner_phone',
      'owner_email', 'owner_type', 'agent_id', 'main_image', 'images',
      'video_url', 'virtual_tour_url'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    if (updates.price !== undefined) {
      const priceNum = Number(updates.price);
      updates.price = priceNum;
      if (!updates.price_formatted) {
        const trans = updates.transaction_type || existing.transaction_type;
        updates.price_formatted = `${priceNum.toLocaleString('fr-FR')} DA${trans === 'location' ? '/mois' : ''}`;
      }
    }

    const updated = await updateProperty(existing.id, updates, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Propriété mise à jour avec succès.',
      property: updated
    });
  } catch (err) {
    console.error(`PUT /api/properties/${params?.id} error:`, err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la mise à jour.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin']);
    if (!auth.authorized) return auth.response;

    const { id } = params;
    const existing = await getPropertyById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable.' },
        { status: 404 }
      );
    }

    await deleteProperty(existing.id, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Propriété supprimée avec succès.'
    });
  } catch (err) {
    console.error(`DELETE /api/properties/${params?.id} error:`, err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur lors de la suppression.' },
      { status: 500 }
    );
  }
}
