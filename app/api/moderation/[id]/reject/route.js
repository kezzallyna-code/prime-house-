import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import database from '@/data/database.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

export async function POST(request, { params }) {
  try {
    const { id } = params;
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const properties = database.properties || [];
    const property = properties.find((p) => p.id === id || p.ref === id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable dans le flux de modération.' },
        { status: 404 }
      );
    }

    property.publication_status = 'archive';
    property.moderation_rejection_reason = body.reason || 'Non-conformité foncière';
    property.moderation_notes = body.notes || '';
    property.updated_at = new Date().toISOString();

    database.moderation_history = database.moderation_history || [];
    database.moderation_history.unshift({
      id: `mod-hist-${Date.now()}`,
      property_id: property.id,
      property_ref: property.ref,
      action: 'rejected',
      reason: body.reason || 'Non-conformité foncière',
      notes: body.notes || '',
      created_at: new Date().toISOString(),
    });

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write to database.json (expected in read-only environment):', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Le dossier ${property.ref} a été rejeté. Notification transmise au déposant.`,
        property,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error rejecting moderation property:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors du rejet du bien.' },
      { status: 500 }
    );
  }
}
