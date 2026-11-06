import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import database from '@/data/database.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'database.json');

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
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

    return NextResponse.json(
      { success: true, property },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const properties = database.properties || [];
    const index = properties.findIndex((p) => p.id === id || p.ref === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable pour mise à jour.' },
        { status: 404 }
      );
    }

    const current = properties[index];
    const updated = {
      ...current,
      ...body,
      id: current.id, // Preserve ID
      ref: current.ref, // Preserve REF
      price: body.price !== undefined ? Number(body.price) : current.price,
      price_formatted: body.price !== undefined ? `${Number(body.price).toLocaleString('fr-FR')} DA` : current.price_formatted,
      surface_habitable: body.surface_habitable !== undefined ? Number(body.surface_habitable) : current.surface_habitable,
      surface_terrain: body.surface_terrain !== undefined ? Number(body.surface_terrain) : current.surface_terrain,
      bedrooms: body.bedrooms !== undefined ? Number(body.bedrooms) : current.bedrooms,
      bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : current.bathrooms,
      wilaya_code: body.wilaya_code !== undefined ? Number(body.wilaya_code) : current.wilaya_code,
      updated_at: new Date().toISOString(),
    };

    properties[index] = updated;

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Bien mis à jour avec succès.',
        property: updated,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la mise à jour.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const properties = database.properties || [];
    const index = properties.findIndex((p) => p.id === id || p.ref === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Propriété introuvable pour suppression.' },
        { status: 404 }
      );
    }

    const removed = properties.splice(index, 1)[0];

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write database.json:', fsErr.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Le bien ${removed.ref || removed.id} a été supprimé définitivement.`,
        deletedId: removed.id,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la suppression.' },
      { status: 500 }
    );
  }
}
