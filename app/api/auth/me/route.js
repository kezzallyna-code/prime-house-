import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization') || '';

  if (authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: 'u-admin-01',
          email: 'direction@primehouse-dz.com',
          full_name: 'Karim Benali',
          matricule: 'ADM-DZ-01',
          role: 'super_admin',
          title: 'Directeur Exécutif',
          avatar_url: '/assets/logo-p-transparent.png',
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
    { authenticated: false, user: null },
    {
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

