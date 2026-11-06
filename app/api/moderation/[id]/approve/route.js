import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import database from '@/data/database.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const properties = database.properties || [];
    const property = properties.find((p) => p.id === id || p.ref === id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable dans le flux de modération.' },
        { status: 404 }
      );
    }

    property.publication_status = 'publie';
    property.updated_at = new Date().toISOString();

    database.moderation_history = database.moderation_history || [];
    database.moderation_history.unshift({
      id: `mod-hist-${Date.now()}`,
      property_id: property.id,
      property_ref: property.ref,
      action: 'approved',
      reason: 'Conformité cadastrale et légale certifiée par la modération',
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
        message: `Le bien ${property.ref} a été certifié et publié avec succès.`,
        property,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error approving moderation property:', error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de l'approbation du bien." },
      { status: 500 }
    );
  }
}

