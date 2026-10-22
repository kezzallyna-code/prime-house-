const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');

// ==============================================================================
// 1. ENVIRONMENT CONFIGURATION
// ==============================================================================
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log('✓ Fichier .env chargé avec succès.');
    } catch (e) {
      console.warn('! Avertissement lecture .env:', e.message);
    }
  }
}
loadEnv();

let PORT = parseInt(process.env.PORT, 10) || 3000;
const PUBLIC_DIR = __dirname;
const DATA_FILE = path.join(__dirname, 'data', 'database.json');
const UPLOADS_DIR = path.join(__dirname, 'assets', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'prime_house_secure_session_secret_2026_algeria';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isSupabaseConfigured = Boolean(
  SUPABASE_URL && 
  !SUPABASE_URL.includes('your-project-id') && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);

// Active in-memory session tokens: token -> { userId, email, role, expiresAt }
const ACTIVE_SESSIONS = new Map();

// Generate test session token for demo superadmin
const DEFAULT_SUPERADMIN = {
  id: 'u-admin-01',
  email: 'direction@primehouse-dz.com',
  full_name: 'Karim Benali',
  role: 'super_admin',
  title: 'Directeur Exécutif',
  matricule: 'ADM-DZ-01',
  avatar_url: '../assets/logo-p-transparent.png'
};

// ==============================================================================
// 2. LOCAL PERSISTENT DATABASE ENGINE
// ==============================================================================
function getDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { admin_users: [], categories: [], wilayas: [], properties: [], inquiries: [], visits: [], site_settings: {}, moderation_history: [] };
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture database.json:', err);
    return { admin_users: [], categories: [], wilayas: [], properties: [], inquiries: [], visits: [], site_settings: {}, moderation_history: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Erreur écriture database.json:', err);
    return false;
  }
}

// ==============================================================================
// 3. AUTH & SECURITY HELPERS
// ==============================================================================
function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list;
}

function getSessionFromReq(req) {
  const cookies = parseCookies(req);
  const token = cookies['prime_admin_session'] || (req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/i, '') : null);
  if (!token) return null;

  const session = ACTIVE_SESSIONS.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    ACTIVE_SESSIONS.delete(token);
    return null;
  }
  return session;
}

function createSession(user) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  const session = {
    token,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      title: user.title,
      matricule: user.matricule,
      avatar_url: user.avatar_url
    },
    expiresAt
  };
  ACTIVE_SESSIONS.set(token, session);
  return session;
}

const ADMIN_ROLES = ['super_admin', 'admin', 'moderator'];

function verifyPassword(inputPassword, storedHashOrPassword) {
  if (!inputPassword || !storedHashOrPassword) return false;
  if (inputPassword === storedHashOrPassword) return true;
  const sha256 = crypto.createHash('sha256').update(inputPassword).digest('hex');
  if (sha256 === storedHashOrPassword) return true;
  return false;
}

function authenticateWithSupabase(email, password) {
  return new Promise((resolve) => {
    try {
      const url = new URL(`${SUPABASE_URL}/auth/v1/token?grant_type=password`);
      const postData = JSON.stringify({ email, password });
      const client = url.protocol === 'https:' ? https : http;

      const req = client.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 8000
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (res.statusCode >= 200 && res.statusCode < 300 && data.user) {
              resolve({ success: true, data });
            } else {
              resolve({ success: false, error: data.error_description || data.msg || 'Identifiants invalides' });
            }
          } catch (e) {
            resolve({ success: false, error: 'Réponse Supabase invalide' });
          }
        });
      });

      req.on('error', (err) => {
        console.warn('Erreur connexion Supabase Auth:', err.message);
        resolve({ success: false, error: err.message, networkError: true });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ success: false, error: 'Délai d’attente Supabase dépassé', networkError: true });
      });

      req.write(postData);
      req.end();
    } catch (err) {
      resolve({ success: false, error: err.message, networkError: true });
    }
  });
}

// ==============================================================================
// 4. MIME TYPES FOR STATIC ASSETS
// ==============================================================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.sql': 'text/plain; charset=utf-8'
};

// ==============================================================================
// 5. HTTP SERVER & API ROUTER
// ==============================================================================
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Helper response functions
  const sendJson = (data, status = 200, headers = {}) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...headers
    });
    res.end(JSON.stringify(data));
  };

  const sendError = (message, status = 400) => {
    sendJson({ error: message, success: false }, status);
  };

  const requireAdminSession = () => {
    const session = getSessionFromReq(req);
    if (!session || !session.user || !ADMIN_ROLES.includes(session.user.role)) {
      sendJson({ error: 'Accès non autorisé. Session administrateur requise.', success: false }, 401);
      return null;
    }
    return session;
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    return res.end();
  }

  // Parse JSON Body Helper
  const parseBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 15 * 1024 * 1024) { // 15MB limit
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });

  // ==============================================================================
  // 5.1 API ENDPOINTS (/api/...)
  // ==============================================================================
  if (pathname.startsWith('/api/')) {
    const apiPath = pathname.replace(/^\/api/, '');

    // 1. System Status
    if (apiPath === '/status' && req.method === 'GET') {
      const db = getDatabase();
      return sendJson({
        status: 'online',
        app: 'Prime House Real Estate Admin Console',
        version: '1.5.0-DZ',
        node: 'Alger Centre Node',
        supabaseConfigured: isSupabaseConfigured,
        supabaseUrl: isSupabaseConfigured ? SUPABASE_URL : null,
        counts: {
          properties: db.properties.length,
          published: db.properties.filter(p => p.publication_status === 'publie').length,
          moderation: db.properties.filter(p => p.publication_status === 'moderation').length,
          featured: db.properties.filter(p => p.is_featured).length,
          inquiries: db.inquiries.length,
          categories: db.categories.length,
          wilayas: db.wilayas.length
        },
        time: new Date().toISOString()
      });
    }

    // 2. Authentication: Login
    if (apiPath === '/auth/login' && req.method === 'POST') {
      const body = await parseBody();
      const { email, password } = body;

      if (!email || !password) {
        return sendError('Veuillez renseigner votre adresse email et votre mot de passe.', 400);
      }

      const cleanEmail = String(email).trim().toLowerCase();
      const cleanPassword = String(password);

      let authenticatedAdmin = null;

      // 1. If Supabase is configured, authenticate via Supabase Auth
      if (isSupabaseConfigured) {
        const supaResult = await authenticateWithSupabase(cleanEmail, cleanPassword);
        if (supaResult.success && supaResult.data && supaResult.data.user) {
          const sUser = supaResult.data.user;
          const userRole = sUser.app_metadata?.role || sUser.user_metadata?.role || 'admin';
          if (!ADMIN_ROLES.includes(userRole)) {
            return sendError('Accès refusé. Ce compte ne dispose pas des privilèges administrateur.', 403);
          }
          authenticatedAdmin = {
            id: sUser.id,
            email: sUser.email || cleanEmail,
            full_name: sUser.user_metadata?.full_name || sUser.email?.split('@')[0] || 'Administrateur',
            role: userRole,
            title: sUser.user_metadata?.title || 'Administrateur',
            matricule: sUser.user_metadata?.matricule || 'ADM-SUPA',
            avatar_url: sUser.user_metadata?.avatar_url || '../assets/logo-p-transparent.png'
          };
        } else if (!supaResult.networkError) {
          return sendError('Adresse email ou mot de passe incorrect.', 401);
        }
      }

      // 2. Local database engine authentication (standalone or Supabase fallback)
      if (!authenticatedAdmin) {
        const db = getDatabase();
        const user = db.admin_users.find(u => 
          u.email && u.email.toLowerCase() === cleanEmail &&
          verifyPassword(cleanPassword, u.passwordHash)
        );

        if (!user) {
          return sendError('Adresse email ou mot de passe incorrect.', 401);
        }

        if (!ADMIN_ROLES.includes(user.role)) {
          return sendError('Accès refusé. Ce compte ne dispose pas des privilèges administrateur.', 403);
        }

        authenticatedAdmin = user;
      }

      const session = createSession(authenticatedAdmin);
      const cookieHeader = `prime_admin_session=${session.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;

      return sendJson({
        success: true,
        message: 'Authentification réussie.',
        token: session.token,
        user: session.user
      }, 200, { 'Set-Cookie': cookieHeader });
    }

    // 3. Authentication: Logout
    if (apiPath === '/auth/logout' && req.method === 'POST') {
      const cookies = parseCookies(req);
      const token = cookies['prime_admin_session'];
      if (token) {
        ACTIVE_SESSIONS.delete(token);
      }
      return sendJson({ success: true, message: 'Déconnexion effectuée.' }, 200, {
        'Set-Cookie': 'prime_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
      });
    }

    // 4. Current Admin Profile: Me
    if (apiPath === '/auth/me' && req.method === 'GET') {
      const session = getSessionFromReq(req);
      if (!session) {
        // In local/demo mode if not logged in, return fallback superadmin for seamless experience
        return sendJson({ authenticated: false, user: null }, 401);
      }
      return sendJson({ authenticated: true, user: session.user });
    }

    // 5. Properties: List & Query
    if (apiPath === '/properties' && req.method === 'GET') {
      const db = getDatabase();
      let list = [...db.properties];

      const search = (reqUrl.searchParams.get('search') || '').toLowerCase().trim();
      const status = reqUrl.searchParams.get('status') || '';
      const type = reqUrl.searchParams.get('type') || '';
      const category = reqUrl.searchParams.get('category') || '';
      const wilaya = reqUrl.searchParams.get('wilaya') || '';
      const sort = reqUrl.searchParams.get('sort') || 'recent';
      const page = parseInt(reqUrl.searchParams.get('page'), 10) || 1;
      const limit = parseInt(reqUrl.searchParams.get('limit'), 10) || 10;

      // Filter by search
      if (search) {
        list = list.filter(p => 
          (p.title && p.title.toLowerCase().includes(search)) ||
          (p.ref && p.ref.toLowerCase().includes(search)) ||
          (p.commune && p.commune.toLowerCase().includes(search)) ||
          (p.wilaya_name && p.wilaya_name.toLowerCase().includes(search)) ||
          (p.owner_name && p.owner_name.toLowerCase().includes(search))
        );
      }

      // Filter by publication status
      if (status && status !== 'all' && status !== 'tous') {
        list = list.filter(p => p.publication_status === status);
      }

      // Filter by transaction type
      if (type && type !== 'all') {
        list = list.filter(p => p.transaction_type === type);
      }

      // Filter by category
      if (category && category !== 'all') {
        list = list.filter(p => p.category_name === category || p.category_id === category);
      }

      // Filter by wilaya
      if (wilaya && wilaya !== 'all') {
        list = list.filter(p => p.wilaya_name === wilaya || String(p.wilaya_code) === wilaya);
      }

      // Sorting
      if (sort === 'recent') {
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sort === 'price-desc') {
        list.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sort === 'price-asc') {
        list.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sort === 'title') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      }

      const total = list.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const paginated = list.slice(startIndex, startIndex + limit);

      return sendJson({
        properties: paginated,
        total,
        page,
        limit,
        totalPages
      });
    }

    // 6. Properties: Create (Admin Only)
    if (apiPath === '/properties' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      if (!body.title || !body.price) {
        return sendError('Le titre et le prix sont obligatoires.');
      }

      const db = getDatabase();
      const newId = 'prop-' + Date.now();
      const randomRef = 'PH-' + (body.wilaya_code || '16') + '-' + Math.floor(100 + Math.random() * 900);

      const priceNum = parseFloat(body.price) || 0;
      const priceFormatted = priceNum.toLocaleString('fr-FR') + ' DA' + (body.transaction_type === 'location' ? ' / mois' : '');

      const newProperty = {
        id: newId,
        ref: body.ref || randomRef,
        title: body.title,
        title_ar: body.title_ar || '',
        tagline: body.tagline || '',
        description: body.description || '',
        description_ar: body.description_ar || '',
        transaction_type: body.transaction_type || 'vente',
        category_id: body.category_id || 'cat-01',
        category_name: body.category_name || 'Villa Contemporaine',
        price: priceNum,
        price_formatted: priceFormatted,
        price_period: body.price_period || (body.transaction_type === 'location' ? 'month' : null),
        price_negotiable: Boolean(body.price_negotiable),
        wilaya_code: parseInt(body.wilaya_code, 10) || 16,
        wilaya_name: body.wilaya_name || 'Alger',
        commune: body.commune || 'Hydra',
        address: body.address || '',
        cadastral_section: body.cadastral_section || '',
        cadastral_number: body.cadastral_number || '',
        surface_habitable: parseFloat(body.surface_habitable) || 0,
        surface_terrain: parseFloat(body.surface_terrain) || 0,
        bedrooms: parseInt(body.bedrooms, 10) || 0,
        bathrooms: parseInt(body.bathrooms, 10) || 0,
        garage_spaces: parseInt(body.garage_spaces, 10) || 0,
        floors: parseInt(body.floors, 10) || 1,
        year_built: parseInt(body.year_built, 10) || new Date().getFullYear(),
        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        legal_status: body.legal_status || 'Acte notarié & Livret foncier individuel',
        publication_status: body.publication_status || 'publie',
        is_featured: Boolean(body.is_featured),
        featured_order: body.is_featured ? (db.properties.filter(p => p.is_featured).length + 1) : null,
        owner_name: body.owner_name || 'Direction Prime House',
        owner_phone: body.owner_phone || '+213 23 45 67 89',
        owner_email: body.owner_email || 'mandats@primehouse-dz.com',
        owner_type: body.owner_type || 'direction',
        main_image: body.main_image || (body.images && body.images[0]) || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bKsGPaeW8-X3XC8DoI9DT6EKwaAzgKLHCx422LwMp6VqohaRxtThvKprkfDbFmMTOsN41xJiEh69fs9dLQA-J-GFxBfJ_R7NSL6D6LCS4xeA7EIwDsCsmCbbHLENq1i4n2P6WaZ9C88UlEDrfxoNJflVVYTDZsay6cxmG3UuAggEvlO2eV2UkYwQKlGwvuyCFiLPJ0SD4n7iYI8u3f02gEdyjiM9vxBCPxUCSAWPIb3i1Au-Hs',
        images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.main_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bKsGPaeW8-X3XC8DoI9DT6EKwaAzgKLHCx422LwMp6VqohaRxtThvKprkfDbFmMTOsN41xJiEh69fs9dLQA-J-GFxBfJ_R7NSL6D6LCS4xeA7EIwDsCsmCbbHLENq1i4n2P6WaZ9C88UlEDrfxoNJflVVYTDZsay6cxmG3UuAggEvlO2eV2UkYwQKlGwvuyCFiLPJ0SD4n7iYI8u3f02gEdyjiM9vxBCPxUCSAWPIb3i1Au-Hs'],
        views_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      db.properties.unshift(newProperty);
      saveDatabase(db);
      return sendJson({ success: true, property: newProperty }, 201);
    }

    // 7. Property: Details, Update, Delete
    const propMatch = apiPath.match(/^\/properties\/([^\/]+)$/);
    if (propMatch) {
      const propId = propMatch[1];
      const db = getDatabase();
      const propIndex = db.properties.findIndex(p => p.id === propId || p.ref === propId);

      if (propIndex === -1) {
        return sendError('Propriété introuvable.', 404);
      }

      if (req.method === 'GET') {
        return sendJson(db.properties[propIndex]);
      }

      if (req.method === 'PUT') {
        if (!requireAdminSession()) return;
        const body = await parseBody();
        const existing = db.properties[propIndex];

        const priceNum = body.price !== undefined ? parseFloat(body.price) : existing.price;
        const priceFormatted = priceNum.toLocaleString('fr-FR') + ' DA' + ((body.transaction_type || existing.transaction_type) === 'location' ? ' / mois' : '');

        const updated = {
          ...existing,
          ...body,
          id: existing.id,
          ref: existing.ref,
          price: priceNum,
          price_formatted: priceFormatted,
          updated_at: new Date().toISOString()
        };

        db.properties[propIndex] = updated;
        saveDatabase(db);
        return sendJson({ success: true, property: updated });
      }

      if (req.method === 'DELETE') {
        if (!requireAdminSession()) return;
        const deleted = db.properties.splice(propIndex, 1)[0];
        saveDatabase(db);
        return sendJson({ success: true, message: 'Propriété supprimée.', id: deleted.id });
      }
    }

    // 8. Properties: Toggle Publish
    const togglePubMatch = apiPath.match(/^\/properties\/([^\/]+)\/toggle-publish$/);
    if (togglePubMatch && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const propId = togglePubMatch[1];
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propId || p.ref === propId);
      if (!prop) return sendError('Bien introuvable.', 404);

      prop.publication_status = prop.publication_status === 'publie' ? 'brouillon' : 'publie';
      prop.updated_at = new Date().toISOString();
      saveDatabase(db);
      return sendJson({ success: true, publication_status: prop.publication_status, property: prop });
    }

    // 9. Properties: Toggle Featured
    const toggleFeatMatch = apiPath.match(/^\/properties\/([^\/]+)\/toggle-featured$/);
    if (toggleFeatMatch && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const propId = toggleFeatMatch[1];
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propId || p.ref === propId);
      if (!prop) return sendError('Bien introuvable.', 404);

      if (prop.is_featured) {
        prop.is_featured = false;
        prop.featured_order = null;
      } else {
        const maxOrder = Math.max(0, ...db.properties.filter(p => p.is_featured).map(p => p.featured_order || 0));
        prop.is_featured = true;
        prop.featured_order = maxOrder + 1;
      }
      prop.updated_at = new Date().toISOString();
      saveDatabase(db);
      return sendJson({ success: true, is_featured: prop.is_featured, featured_order: prop.featured_order, property: prop });
    }

    // 10. Moderation Queue
    if (apiPath === '/moderation' && req.method === 'GET') {
      if (!requireAdminSession()) return;
      const db = getDatabase();
      const pending = db.properties.filter(p => p.publication_status === 'moderation');
      return sendJson({ pending, count: pending.length });
    }

    // 11. Moderation: Approve
    const modApproveMatch = apiPath.match(/^\/moderation\/([^\/]+)\/approve$/);
    if (modApproveMatch && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const propId = modApproveMatch[1];
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propId || p.ref === propId);
      if (!prop) return sendError('Bien introuvable.', 404);

      prop.publication_status = 'publie';
      prop.updated_at = new Date().toISOString();

      db.moderation_history = db.moderation_history || [];
      db.moderation_history.unshift({
        id: 'mod-hist-' + Date.now(),
        property_id: prop.id,
        action: 'approved',
        reason: 'Conformité cadastrale et légale vérifiée par la modération',
        created_at: new Date().toISOString()
      });

      saveDatabase(db);
      return sendJson({ success: true, message: 'Dossier approuvé et publié en vitrine.', property: prop });
    }

    // 12. Moderation: Reject
    const modRejectMatch = apiPath.match(/^\/moderation\/([^\/]+)\/reject$/);
    if (modRejectMatch && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const propId = modRejectMatch[1];
      const body = await parseBody();
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propId || p.ref === propId);
      if (!prop) return sendError('Bien introuvable.', 404);

      prop.publication_status = 'archive';
      prop.rejection_reason = body.reason || 'Dossier foncier incomplet';
      prop.updated_at = new Date().toISOString();

      db.moderation_history = db.moderation_history || [];
      db.moderation_history.unshift({
        id: 'mod-hist-' + Date.now(),
        property_id: prop.id,
        action: 'rejected',
        reason: body.reason || 'Non conformité foncière',
        notes: body.notes || '',
        created_at: new Date().toISOString()
      });

      saveDatabase(db);
      return sendJson({ success: true, message: 'Dossier rejeté et archivé.', property: prop });
    }

    // 13. Featured Properties (Vitrine)
    if (apiPath === '/featured' && req.method === 'GET') {
      const db = getDatabase();
      const featured = db.properties
        .filter(p => p.is_featured && p.publication_status === 'publie')
        .sort((a, b) => (a.featured_order || 999) - (b.featured_order || 999));
      return sendJson({ featured, count: featured.length });
    }

    if (apiPath === '/featured/reorder' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      const { orderedIds } = body;
      if (!Array.isArray(orderedIds)) {
        return sendError('orderedIds doit être un tableau.');
      }
      const db = getDatabase();
      orderedIds.forEach((id, idx) => {
        const prop = db.properties.find(p => p.id === id || p.ref === id);
        if (prop) {
          prop.featured_order = idx + 1;
        }
      });
      saveDatabase(db);
      return sendJson({ success: true, message: 'Ordre de la vitrine mis à jour.' });
    }

    if (apiPath === '/featured/add' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      const { propertyId } = body;
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propertyId || p.ref === propertyId);
      if (!prop) return sendError('Propriété introuvable.', 404);

      if (prop.is_featured) {
        return sendError('Cette propriété est déjà dans la sélection vitrine.');
      }

      const maxOrder = Math.max(0, ...db.properties.filter(p => p.is_featured).map(p => p.featured_order || 0));
      prop.is_featured = true;
      prop.featured_order = maxOrder + 1;
      saveDatabase(db);
      return sendJson({ success: true, property: prop });
    }

    const removeFeatMatch = apiPath.match(/^\/featured\/([^\/]+)$/);
    if (removeFeatMatch && req.method === 'DELETE') {
      if (!requireAdminSession()) return;
      const propId = removeFeatMatch[1];
      const db = getDatabase();
      const prop = db.properties.find(p => p.id === propId || p.ref === propId);
      if (!prop) return sendError('Propriété introuvable.', 404);

      prop.is_featured = false;
      prop.featured_order = null;

      // Re-index remaining featured
      const remaining = db.properties
        .filter(p => p.is_featured)
        .sort((a, b) => (a.featured_order || 999) - (b.featured_order || 999));
      remaining.forEach((p, i) => { p.featured_order = i + 1; });

      saveDatabase(db);
      return sendJson({ success: true, message: 'Retiré de la vitrine.', propertyId: prop.id });
    }

    // 14. Inquiries & Visits Management
    if (apiPath === '/inquiries' && req.method === 'GET') {
      if (!requireAdminSession()) return;
      const db = getDatabase();
      let list = [...(db.inquiries || [])];
      const status = reqUrl.searchParams.get('status');
      const search = (reqUrl.searchParams.get('search') || '').toLowerCase().trim();

      if (status && status !== 'all') {
        list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        list = list.filter(i => 
          i.client_name.toLowerCase().includes(search) ||
          i.client_phone.toLowerCase().includes(search) ||
          (i.client_email && i.client_email.toLowerCase().includes(search)) ||
          (i.property_ref && i.property_ref.toLowerCase().includes(search))
        );
      }
      return sendJson({ inquiries: list, total: list.length });
    }

    if (apiPath === '/inquiries' && req.method === 'POST') {
      const body = await parseBody();
      if (!body.client_name || !body.client_phone) {
        return sendError('Le nom et le numéro de téléphone sont obligatoires.');
      }
      const db = getDatabase();
      const newInquiry = {
        id: 'inq-' + Date.now(),
        property_id: body.property_id || null,
        property_ref: body.property_ref || 'Général',
        property_title: body.property_title || 'Demande de contact générale',
        client_name: body.client_name,
        client_email: body.client_email || '',
        client_phone: body.client_phone,
        inquiry_type: body.inquiry_type || 'Demande de visite privée',
        message: body.message || '',
        status: 'Nouveau',
        visit_date: body.visit_date || null,
        internal_notes: body.internal_notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.inquiries.unshift(newInquiry);
      saveDatabase(db);
      return sendJson({ success: true, inquiry: newInquiry }, 201);
    }

    const inqMatch = apiPath.match(/^\/inquiries\/([^\/]+)$/);
    if (inqMatch) {
      const inqId = inqMatch[1];
      const db = getDatabase();
      const inqIndex = db.inquiries.findIndex(i => i.id === inqId);

      if (inqIndex === -1) return sendError('Demande introuvable.', 404);

      if (req.method === 'PUT') {
        if (!requireAdminSession()) return;
        const body = await parseBody();
        const existing = db.inquiries[inqIndex];
        const updated = {
          ...existing,
          ...body,
          id: existing.id,
          updated_at: new Date().toISOString()
        };
        db.inquiries[inqIndex] = updated;

        // If visit date was set or updated, create/update visit
        if (body.visit_date) {
          db.visits = db.visits || [];
          const visitIdx = db.visits.findIndex(v => v.inquiry_id === inqId);
          if (visitIdx > -1) {
            db.visits[visitIdx].scheduled_at = body.visit_date;
            db.visits[visitIdx].status = 'Programmee';
          } else {
            db.visits.push({
              id: 'vis-' + Date.now(),
              inquiry_id: inqId,
              property_id: existing.property_id,
              property_title: existing.property_title,
              scheduled_at: body.visit_date,
              status: 'Programmee',
              escort_agent: body.escort_agent || 'Karim Benali',
              client_name: existing.client_name,
              client_phone: existing.client_phone,
              notes: body.internal_notes || ''
            });
          }
        }

        saveDatabase(db);
        return sendJson({ success: true, inquiry: updated });
      }

      if (req.method === 'DELETE') {
        if (!requireAdminSession()) return;
        db.inquiries.splice(inqIndex, 1);
        saveDatabase(db);
        return sendJson({ success: true, message: 'Demande supprimée.' });
      }
    }

    // 15. Categories API
    if (apiPath === '/categories' && req.method === 'GET') {
      const db = getDatabase();
      return sendJson({ categories: db.categories });
    }

    if (apiPath === '/categories' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      if (!body.name) return sendError('Nom de catégorie requis.');
      const db = getDatabase();
      const newCat = {
        id: 'cat-' + Date.now(),
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description || '',
        icon: body.icon || 'apartment',
        is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
        sort_order: db.categories.length + 1
      };
      db.categories.push(newCat);
      saveDatabase(db);
      return sendJson({ success: true, category: newCat }, 201);
    }

    const catIdMatch = apiPath.match(/^\/categories\/([^\/]+)$/);
    if (catIdMatch) {
      const catId = catIdMatch[1];
      const db = getDatabase();
      const idx = db.categories.findIndex(c => c.id === catId || c.slug === catId);
      if (idx === -1) return sendError('Catégorie introuvable.', 404);

      if (req.method === 'PUT') {
        if (!requireAdminSession()) return;
        const body = await parseBody();
        db.categories[idx] = { ...db.categories[idx], ...body, id: db.categories[idx].id };
        saveDatabase(db);
        return sendJson({ success: true, category: db.categories[idx] });
      }

      if (req.method === 'DELETE') {
        if (!requireAdminSession()) return;
        const target = db.categories[idx];
        const linkedCount = db.properties.filter(p => p.category_id === target.id || p.category_name === target.name).length;
        if (linkedCount > 0) {
          return sendError(`Action bloquée : ${linkedCount} bien(s) sont rattachés à cette catégorie. Désactivez-la au lieu de la supprimer.`);
        }
        db.categories.splice(idx, 1);
        saveDatabase(db);
        return sendJson({ success: true, message: 'Catégorie supprimée.' });
      }
    }

    // 16. Wilayas API
    if (apiPath === '/wilayas' && req.method === 'GET') {
      const db = getDatabase();
      return sendJson({ wilayas: db.wilayas });
    }

    if (apiPath === '/wilayas' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      if (!body.name || !body.code) return sendError('Code et nom de wilaya requis.');
      const db = getDatabase();
      const newWilaya = {
        code: parseInt(body.code, 10),
        name: body.name,
        arabic_name: body.arabic_name || '',
        region: body.region || 'Centre',
        communes: Array.isArray(body.communes) ? body.communes : [],
        is_active: true
      };
      db.wilayas.push(newWilaya);
      saveDatabase(db);
      return sendJson({ success: true, wilaya: newWilaya }, 201);
    }

    // 17. Settings API
    if (apiPath === '/settings' && req.method === 'GET') {
      const db = getDatabase();
      return sendJson(db.site_settings || {});
    }

    if (apiPath === '/settings' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      const db = getDatabase();
      db.site_settings = {
        ...db.site_settings,
        ...body
      };
      saveDatabase(db);
      return sendJson({ success: true, message: 'Paramètres mis à jour.', settings: db.site_settings });
    }

    // 18. File Image Upload API
    if (apiPath === '/upload' && req.method === 'POST') {
      if (!requireAdminSession()) return;
      const body = await parseBody();
      if (!body.image) {
        return sendError('Données image manquantes.');
      }

      let matches = body.image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return sendError('Format d\'image invalide (Base64 requis).');
      }

      let ext = matches[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      if (!['jpg', 'png', 'webp'].includes(ext)) {
        return sendError('Seuls les formats JPG, PNG et WebP sont autorisés.');
      }

      const buffer = Buffer.from(matches[2], 'base64');
      if (buffer.length > 10 * 1024 * 1024) {
        return sendError('L\'image dépasse la taille maximale autorisée de 10 Mo.');
      }

      const fileName = `ph_upload_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, fileName);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `../assets/uploads/${fileName}`;
      return sendJson({
        success: true,
        url: publicUrl,
        storage_path: `properties/${fileName}`,
        size: buffer.length
      });
    }

    // 19. Export Registry to CSV
    if (apiPath === '/export/properties' && req.method === 'GET') {
      if (!requireAdminSession()) return;
      const db = getDatabase();
      let csv = 'RÉFÉRENCE;TITRE;TRANSACTION;CATÉGORIE;WILAYA;COMMUNE;PRIX_DA;SURFACE_M2;CHAMBRES;STATUT;À_LA_UNE;DATE\n';
      db.properties.forEach(p => {
        csv += `"${p.ref}";"${p.title.replace(/"/g, '""')}";"${p.transaction_type}";"${p.category_name}";"${p.wilaya_name}";"${p.commune}";"${p.price}";"${p.surface_habitable || ''}";"${p.bedrooms || 0}";"${p.publication_status}";"${p.is_featured ? 'OUI' : 'NON'}";"${p.created_at || ''}"\n`;
      });
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="registre_biens_prime_house.csv"'
      });
      return res.end(csv);
    }

    // 20. Export Inquiries to CSV
    if (apiPath === '/export/inquiries' && req.method === 'GET') {
      if (!requireAdminSession()) return;
      const db = getDatabase();
      let csv = 'ID;CLIENT;TÉLÉPHONE;EMAIL;RÉF_BIEN;TITRE_BIEN;TYPE_DEMANDE;STATUT;DATE_VISITE;MESSAGE\n';
      db.inquiries.forEach(i => {
        csv += `"${i.id}";"${i.client_name.replace(/"/g, '""')}";"${i.client_phone}";"${i.client_email || ''}";"${i.property_ref || ''}";"${(i.property_title || '').replace(/"/g, '""')}";"${i.inquiry_type}";"${i.status}";"${i.visit_date || ''}";"${(i.message || '').replace(/"/g, '""')}"\n`;
      });
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="demandes_leads_prime_house.csv"'
      });
      return res.end(csv);
    }

    return sendError('Route API inconnue.', 404);
  }

  // ==============================================================================
  // 5.2 SERVER-SIDE ROUTE PROTECTION FOR ADMIN DASHBOARD
  // ==============================================================================
  if (pathname === '/admin' || pathname === '/admin/' || (pathname.startsWith('/admin/') && pathname.endsWith('.html'))) {
    const isLoginScreen = pathname.includes('/admin/login.html');
    if (!isLoginScreen) {
      const session = getSessionFromReq(req);
      if (!session || !session.user || !ADMIN_ROLES.includes(session.user.role)) {
        // Enforce server-side protection: Redirect to login with original target
        res.writeHead(302, {
          'Location': `/admin/login.html?redirect=${encodeURIComponent(pathname)}`,
          'Cache-Control': 'no-store'
        });
        return res.end();
      }
    }
  }

  // ==============================================================================
  // 5.3 STATIC FILE SERVING
  // ==============================================================================
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>404 - Prime House</title></head><body style="font-family:sans-serif;padding:3rem;background:#071426;color:#ffffff;text-align:center;"><h1>404 — Introuvable</h1><p>Le document <code>${pathname}</code> est introuvable.</p><p><a href="/" style="color:#C49A3A;">Retour à l'accueil</a></p></body></html>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500);
      }
      res.end('Erreur serveur de lecture');
    });
    stream.pipe(res);
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    const url = `http://localhost:${portToTry}`;
    console.log(`\n======================================================================`);
    console.log(`  PRIME HOUSE - SERVEUR LOCAL & BACKEND ADMIN ACTIF !`);
    console.log(`  Portail Public : ${url}`);
    console.log(`  Console Admin  : ${url}/admin/index.html`);
    console.log(`  Connexion      : ${url}/admin/login.html`);
    console.log(`  Statut Backend : ${isSupabaseConfigured ? 'Supabase Connecté (PostgreSQL DZ Node)' : 'Mode Local Persistant (data/database.json)'}`);
    console.log(`======================================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} occupé, basculement automatique sur ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Erreur serveur critique:', err);
    }
  });
}

startServer(PORT);
