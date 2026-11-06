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

    property.is_featured = !property.is_featured;
    property.updated_at = new Date().toISOString();

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: property.is_featured
          ? `Le bien ${property.ref} a été ajouté à la vitrine (À la Une).`
          : `Le bien ${property.ref} a été retiré de la vitrine.`,
        is_featured: property.is_featured,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error toggling featured:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}
