import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { verifyPassword, createSessionToken, hashPassword } from '@/lib/auth';
import { logAuditEvent } from '@/lib/db';

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

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json(
        { success: false, error: 'Veuillez saisir votre email et mot de passe.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Query admin user from Supabase PostgreSQL
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', cleanEmail)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: 'Identifiants invalides ou compte inactif.' },
        { status: 401 }
      );
    }

    // Verify Password
    let isPasswordValid = verifyPassword(cleanPassword, user.password_hash);

    // Initial migration helper: if password_hash matches plain password during seed migration, upgrade to PBKDF2 hash
    if (!isPasswordValid && user.password_hash === cleanPassword) {
      isPasswordValid = true;
      const newHash = hashPassword(cleanPassword);
      await supabase.from('admin_users').update({ password_hash: newHash }).eq('id', user.id);
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Identifiants invalides.' },
        { status: 401 }
      );
    }

    // Update last_login_at
    await supabase.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id);

    // Create secure cryptographic session token
    const token = createSessionToken(user);

    await logAuditEvent({
      userId: user.id,
      userEmail: user.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      entityType: 'user',
      entityId: user.id,
      req: request
    });

    const isProd = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      message: 'Authentification réussie.',
      token,
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
    });

    // Set HttpOnly Secure Cookie
    response.cookies.set('prime_admin_session', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur lors de la connexion.' },
      { status: 500 }
    );
  }
}
