import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Déconnexion réussie.'
  });

  // Clear session cookie
  response.cookies.set('prime_admin_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0)
  });

  return response;
}

