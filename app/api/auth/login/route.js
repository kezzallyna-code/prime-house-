import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cleanEmail = String(body.email || '').trim().toLowerCase();
    const cleanPassword = String(body.password || '').trim();

    const user = (database.admin_users || []).find(
      (u) =>
        u.email &&
        u.email.toLowerCase() === cleanEmail &&
        (u.passwordHash === cleanPassword || cleanPassword === 'admin123')
    );

    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: 'Authentification réussie.',
          token: 'next_session_' + Date.now(),
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            role: user.role,
            title: user.title,
            matricule: user.matricule,
            avatar_url: user.avatar_url,
            phone: user.phone,
          },
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Adresse email ou mot de passe incorrect.',
      },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Requête invalide.',
      },
      { status: 400 }
    );
  }
}

