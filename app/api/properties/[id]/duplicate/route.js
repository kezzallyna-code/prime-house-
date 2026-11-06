import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import database from '@/data/database.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const properties = database.properties || [];
    const source = properties.find((p) => p.id === id || p.ref === id);

    if (!source) {
      return NextResponse.json(
        { success: false, error: 'Propriété source introuvable.' },
        { status: 404 }
      );
    }

    const newId = `prop-${Date.now()}`;
    const newRef = `PH-ALG-${Math.floor(100 + Math.random() * 900)}`;

    const cloned = {
      ...source,
      id: newId,
      ref: newRef,
      title: `${source.title} (Copie)`,
      publication_status: 'brouillon',
      is_featured: false,
      featured_order: null,
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_demo: false,
    };

    properties.unshift(cloned);

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Mandat dupliqué avec succès sous la référence ${newRef}.`,
        property: cloned,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error duplicating property:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}

