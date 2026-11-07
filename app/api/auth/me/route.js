import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const auth = await getAuthenticatedAdmin(request);

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { authenticated: false, error: auth.error || 'Non authentifié.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: auth.user
    });
  } catch (err) {
    console.error('/api/auth/me error:', err);
    return NextResponse.json(
      { authenticated: false, error: 'Erreur de vérification.' },
      { status: 500 }
    );
  }
}
