import crypto from 'crypto';
import { getSupabaseAdmin } from './supabase-server.js';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'prime_house_super_secure_session_secret_2026_dz';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

// ==============================================================================
// 1. SECURE PASSWORD HASHING (PBKDF2-SHA512 with Salt)
// ==============================================================================
export function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(plainPassword, salt, 100000, 64, 'sha512').toString('hex');
  return `pbkdf2$100000$${salt}$${hash}`;
}

export function verifyPassword(plainPassword, storedHash) {
  if (!plainPassword || !storedHash) return false;

  // Support PBKDF2 format
  if (storedHash.startsWith('pbkdf2$')) {
    const parts = storedHash.split('$');
    if (parts.length !== 4) return false;
    const iterations = parseInt(parts[1], 10);
    const salt = parts[2];
    const originalHash = parts[3];
    const computedHash = crypto.pbkdf2Sync(plainPassword, salt, iterations, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(computedHash, 'hex'));
  }

  // Fallback for initial unhashed migration passwords (temporary only)
  return false;
}

// ==============================================================================
// 2. CRYPTOGRAPHICALLY SIGNED SESSION TOKENS (HMAC-SHA256)
// ==============================================================================
export function createSessionToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.full_name,
    role: user.role,
    title: user.title,
    matricule: user.matricule,
    iat: now,
    exp: now + SESSION_MAX_AGE
  })).toString('base64url');

  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  try {
    const isSigValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    if (!isSigValid) return null;

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (data.exp && data.exp < now) {
      return null; // Expired
    }
    return data;
  } catch {
    return null;
  }
}

// ==============================================================================
// 3. SERVER-SIDE AUTHENTICATION EXTRACTOR
// ==============================================================================
export async function getAuthenticatedAdmin(request) {
  try {
    // 1. Extract from Cookie
    let token = null;
    if (request.cookies && typeof request.cookies.get === 'function') {
      token = request.cookies.get('prime_admin_session')?.value;
    } else if (request.headers && typeof request.headers.get === 'function') {
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(/prime_admin_session=([^;]+)/);
      if (match) token = match[1];
    }

    // 2. Extract from Authorization Header (Bearer)
    if (!token && request.headers && typeof request.headers.get === 'function') {
      const authHeader = request.headers.get('authorization') || '';
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
      }
    }

    if (!token) {
      return { authenticated: false, error: 'Aucun jeton de session fourni.' };
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return { authenticated: false, error: 'Session expirée ou invalide.' };
    }

    return {
      authenticated: true,
      user: {
        id: payload.sub,
        email: payload.email,
        full_name: payload.name,
        role: payload.role,
        title: payload.title,
        matricule: payload.matricule
      }
    };
  } catch (e) {
    console.error('getAuthenticatedAdmin error:', e.message);
    return { authenticated: false, error: 'Erreur de vérification de session.' };
  }
}

export async function requireAdmin(request, allowedRoles = ['super_admin', 'admin', 'moderator', 'agent']) {
  const auth = await getAuthenticatedAdmin(request);
  if (!auth.authenticated || !auth.user) {
    return {
      authorized: false,
      response: new Response(
        JSON.stringify({ success: false, error: auth.error || 'Accès non autorisé.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    };
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return {
      authorized: false,
      response: new Response(
        JSON.stringify({ success: false, error: 'Droits insuffisants pour effectuer cette action.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    };
  }

  return { authorized: true, user: auth.user };
}

