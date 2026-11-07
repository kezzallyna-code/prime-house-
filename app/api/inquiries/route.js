import { NextResponse } from 'next/server';
import { getInquiries, createInquiry, updateInquiry } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Admin only: List inquiries
export async function GET(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const propertyId = searchParams.get('propertyId') || null;

    const inquiries = await getInquiries({ status, propertyId });

    return NextResponse.json({
      success: true,
      inquiries,
      total: inquiries.length,
    });
  } catch (err) {
    console.error('GET /api/inquiries error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des demandes.' },
      { status: 500 }
    );
  }
}

// Public: Submit inquiry
export async function POST(request) {
  try {
    const body = await request.json();

    // Anti-spam honeypot
    if (body.website_trap || body._hp) {
      return NextResponse.json({ success: true, message: 'Message reçu.' }, { status: 200 });
    }

    const clientName = String(body.client_name || body.name || '').trim();
    const clientPhone = String(body.client_phone || body.phone || '').trim();
    const clientEmail = String(body.client_email || body.email || '').trim();
    const message = String(body.message || '').trim();
    const propertyId = body.property_id || body.propertyId || null;
    const propertyRef = body.property_ref || body.propertyRef || '';
    const propertyTitle = body.property_title || body.propertyTitle || '';
    const inquiryType = body.inquiry_type || body.type || 'Demande de visite privée';

    if (!clientName) {
      return NextResponse.json(
        { success: false, error: 'Veuillez renseigner votre nom complet.' },
        { status: 400 }
      );
    }

    if (!clientPhone) {
      return NextResponse.json(
        { success: false, error: 'Un numéro de téléphone de contact est obligatoire.' },
        { status: 400 }
      );
    }

    const saved = await createInquiry({
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail,
      message,
      property_id: propertyId,
      property_ref: propertyRef,
      property_title: propertyTitle,
      inquiry_type: inquiryType,
      status: 'Nouveau'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Votre demande a été transmise avec succès au concierge Prime House.',
        inquiry: saved,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/inquiries error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l’enregistrement de votre demande.' },
      { status: 500 }
    );
  }
}

// Admin: Update inquiry status / notes / assigned agent
export async function PUT(request) {
  try {
    const auth = await requireAdmin(request, ['super_admin', 'admin', 'moderator', 'agent']);
    if (!auth.authorized) return auth.response;

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Identifiant de demande requis.' }, { status: 400 });
    }

    const updated = await updateInquiry(id, updates, auth.user);

    return NextResponse.json({
      success: true,
      message: 'Demande mise à jour avec succès.',
      inquiry: updated
    });
  } catch (err) {
    console.error('PUT /api/inquiries error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Erreur mise à jour.' },
      { status: 500 }
    );
  }
}
