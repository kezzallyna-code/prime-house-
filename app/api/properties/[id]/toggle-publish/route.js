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
        { success: false, error: 'Propriété introuvable.' },
        { status: 404 }
      );
    }

    const wasPublished = property.publication_status === 'publie';
    property.publication_status = wasPublished ? 'archive' : 'publie';
    property.updated_at = new Date().toISOString();

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: property.publication_status === 'publie'
          ? `Le bien ${property.ref} est désormais en ligne et visible par le public.`
          : `Le bien ${property.ref} a été archivé et retiré du site public.`,
        publication_status: property.publication_status,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error toggling publish:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
