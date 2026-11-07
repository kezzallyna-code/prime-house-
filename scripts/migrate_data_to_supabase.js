/**
 * PRIME HOUSE - REPEATABLE DATA MIGRATION & PRESERVATION SCRIPT
 * Migrates data/database.json and lib/data.js records into Supabase PostgreSQL.
 * Supports repeatable idempotent upserts, preserves IDs, refs, Arabic & French texts.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Load .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const k = trimmed.slice(0, eqIdx).trim();
          const v = trimmed.slice(eqIdx + 1).trim().replace(/^['"](.*)['"]$/, '$1');
          if (!process.env[k]) process.env[k] = v;
        }
      }
    });
  }
}
loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(plainPassword, salt, 100000, 64, 'sha512').toString('hex');
  return `pbkdf2$100000$${salt}$${hash}`;
}

async function runMigration() {
  console.log('================================================================');
  console.log('PRIME HOUSE — SUPABASE DATA MIGRATION & PRESERVATION');
  console.log('================================================================\n');

  const report = {
    startedAt: new Date().toISOString(),
    sourceFile: 'data/database.json & lib/data.js',
    counts: {},
    errors: []
  };

  // 1. Load source JSON
  const rawDb = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'database.json'), 'utf8'));

  // Load lib/data.js default properties
  let defaultProperties = [];
  try {
    const libData = require('../lib/data.js');
    defaultProperties = libData.DEFAULT_PROPERTIES || [];
  } catch (e) {
    console.warn('Note: lib/data.js could not be loaded via CJS:', e.message);
  }

  // 2. Migrate Admin Users
  console.log('--> Migrating admin_users...');
  const usersToInsert = (rawDb.admin_users || []).map(u => ({
    id: u.id,
    email: u.email,
    password_hash: hashPassword(u.passwordHash || 'PrimeHouse2026!Admin'),
    full_name: u.full_name,
    matricule: u.matricule,
    role: u.role || 'admin',
    title: u.title,
    avatar_url: u.avatar_url,
    phone: u.phone,
    is_active: true
  }));

  const { error: userErr } = await supabase.from('admin_users').upsert(usersToInsert, { onConflict: 'id' });
  if (userErr) {
    console.error('Error inserting admin_users:', userErr.message);
    report.errors.push(`admin_users: ${userErr.message}`);
  } else {
    console.log(`✓ ${usersToInsert.length} admin users migrated.`);
    report.counts.admin_users = usersToInsert.length;
  }

  // 3. Migrate Categories
  console.log('--> Migrating categories...');
  const categoriesToInsert = (rawDb.categories || []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    icon: c.icon || 'apartment',
    is_active: c.is_active !== false,
    sort_order: c.sort_order || 0
  }));

  const { error: catErr } = await supabase.from('categories').upsert(categoriesToInsert, { onConflict: 'id' });
  if (catErr) {
    console.error('Error inserting categories:', catErr.message);
    report.errors.push(`categories: ${catErr.message}`);
  } else {
    console.log(`✓ ${categoriesToInsert.length} categories migrated.`);
    report.counts.categories = categoriesToInsert.length;
  }

  // 4. Migrate Wilayas
  console.log('--> Migrating wilayas...');
  const wilayasToInsert = (rawDb.wilayas || []).map(w => ({
    code: Number(w.code),
    name: w.name,
    arabic_name: w.arabic_name || null,
    region: w.region || 'Centre',
    communes: w.communes || [],
    is_active: w.is_active !== false
  }));

  const { error: wilErr } = await supabase.from('wilayas').upsert(wilayasToInsert, { onConflict: 'code' });
  if (wilErr) {
    console.error('Error inserting wilayas:', wilErr.message);
    report.errors.push(`wilayas: ${wilErr.message}`);
  } else {
    console.log(`✓ ${wilayasToInsert.length} wilayas migrated.`);
    report.counts.wilayas = wilayasToInsert.length;
  }

  // 5. Migrate Properties (both database.json & lib/data.js)
  console.log('--> Migrating properties...');
  const propertiesMap = new Map();

  // Add from database.json
  (rawDb.properties || []).forEach(p => {
    propertiesMap.set(p.id, {
      id: p.id,
      ref: p.ref,
      title: p.title,
      title_ar: p.title_ar || null,
      tagline: p.tagline || null,
      description: p.description || '',
      description_ar: p.description_ar || null,
      transaction_type: p.transaction_type || 'vente',
      category_id: p.category_id || null,
      category_name: p.category_name || 'Villa Contemporaine',
      price: Number(p.price || 0),
      price_formatted: p.price_formatted || null,
      price_period: p.price_period || null,
      price_negotiable: Boolean(p.price_negotiable),
      currency: 'DZD',
      wilaya_code: p.wilaya_code ? Number(p.wilaya_code) : null,
      wilaya_name: p.wilaya_name || 'Alger',
      commune: p.commune || 'Hydra',
      address: p.address || null,
      cadastral_section: p.cadastral_section || null,
      cadastral_number: p.cadastral_number || null,
      surface_habitable: Number(p.surface_habitable || 0),
      surface_terrain: Number(p.surface_terrain || 0),
      bedrooms: Number(p.bedrooms || 0),
      bathrooms: Number(p.bathrooms || 0),
      living_rooms: Number(p.living_rooms || 0),
      garage_spaces: Number(p.garage_spaces || 0),
      floors: Number(p.floors || 1),
      year_built: p.year_built ? Number(p.year_built) : null,
      amenities: Array.isArray(p.amenities) ? p.amenities : [],
      legal_status: p.legal_status || 'Acte notarié & Livret foncier',
      publication_status: p.publication_status || 'publie',
      is_featured: Boolean(p.is_featured),
      featured_order: p.featured_order ? Number(p.featured_order) : null,
      is_exclusive: Boolean(p.is_exclusive),
      is_demo: true,
      owner_name: p.owner_name || 'Direction Prime House',
      owner_phone: p.owner_phone || '+213 23 45 67 89',
      owner_email: p.owner_email || 'mandats@primehouse-dz.com',
      owner_type: p.owner_type || 'direction',
      main_image: p.main_image || (p.images && p.images[0]) || '',
      images: Array.isArray(p.images) ? p.images : [],
      views_count: Number(p.views_count || 0),
      created_at: p.created_at || new Date().toISOString(),
      updated_at: p.updated_at || new Date().toISOString()
    });
  });

  // Add from defaultProperties if not present
  defaultProperties.forEach(p => {
    if (!propertiesMap.has(p.id)) {
      propertiesMap.set(p.id, {
        id: p.id,
        ref: p.ref || `PH-${p.id.toUpperCase()}`,
        title: p.title,
        title_ar: p.title_ar || null,
        tagline: p.tagline || null,
        description: p.description || '',
        description_ar: p.description_ar || null,
        transaction_type: p.status === 'location' ? 'location' : 'vente',
        category_id: null,
        category_name: p.type === 'villa' ? 'Villa Contemporaine' : (p.type === 'penthouse' ? 'Penthouse Vue Mer' : 'Duplex de Prestige'),
        price: Number(p.price || 0),
        price_formatted: p.priceFormatted || null,
        price_period: p.status === 'location' ? 'month' : null,
        price_negotiable: false,
        currency: 'DZD',
        wilaya_code: p.wilayaCode ? Number(p.wilayaCode) : null,
        wilaya_name: p.wilaya || 'Alger',
        commune: p.commune || 'Hydra',
        address: p.address || null,
        surface_habitable: Number(p.surface || 0),
        surface_terrain: Number(p.landSurface || 0),
        bedrooms: Number(p.bedrooms || 0),
        bathrooms: Number(p.bathrooms || 0),
        living_rooms: Number(p.livingRooms || 0),
        garage_spaces: Number(p.garages || 0),
        floors: 1,
        amenities: Array.isArray(p.amenities) ? p.amenities : [],
        legal_status: p.legalStatus || 'Acte notarié & Livret foncier',
        publication_status: 'publie',
        is_featured: Boolean(p.isFeatured),
        is_exclusive: Boolean(p.isExclusive),
        is_demo: true,
        owner_name: 'Direction Prime House',
        owner_phone: '+213 23 45 67 89',
        owner_email: 'mandats@primehouse-dz.com',
        owner_type: 'direction',
        main_image: (p.images && p.images[0]) || '',
        images: Array.isArray(p.images) ? p.images : [],
        views_count: 500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });

  const propertiesToInsert = Array.from(propertiesMap.values());
  const { error: propErr } = await supabase.from('properties').upsert(propertiesToInsert, { onConflict: 'id' });
  if (propErr) {
    console.error('Error inserting properties:', propErr.message);
    report.errors.push(`properties: ${propErr.message}`);
  } else {
    console.log(`✓ ${propertiesToInsert.length} properties migrated.`);
    report.counts.properties = propertiesToInsert.length;
  }

  // 6. Migrate Inquiries
  console.log('--> Migrating inquiries...');
  const validPropertyIds = new Set(propertiesToInsert.map(p => p.id));
  const inquiriesToInsert = (rawDb.inquiries || []).map(i => ({
    id: i.id,
    property_id: (i.property_id && validPropertyIds.has(i.property_id)) ? i.property_id : null,
    property_ref: i.property_ref || null,
    property_title: i.property_title || null,
    client_name: i.client_name,
    client_email: i.client_email || null,
    client_phone: i.client_phone,
    inquiry_type: i.inquiry_type || 'Demande de visite privée',
    message: i.message || '',
    status: i.status || 'Nouveau',
    visit_date: i.visit_date || null,
    internal_notes: i.internal_notes || null,
    created_at: i.created_at || new Date().toISOString()
  }));

  const { error: inqErr } = await supabase.from('inquiries').upsert(inquiriesToInsert, { onConflict: 'id' });
  if (inqErr) {
    console.error('Error inserting inquiries:', inqErr.message);
    report.errors.push(`inquiries: ${inqErr.message}`);
  } else {
    console.log(`✓ ${inquiriesToInsert.length} inquiries migrated.`);
    report.counts.inquiries = inquiriesToInsert.length;
  }

  // 7. Migrate Visits
  console.log('--> Migrating visits...');
  const validInquiryIds = new Set(inquiriesToInsert.map(i => i.id));
  const visitsToInsert = (rawDb.visits || []).map(v => ({
    id: v.id,
    inquiry_id: (v.inquiry_id && validInquiryIds.has(v.inquiry_id)) ? v.inquiry_id : null,
    property_id: (v.property_id && validPropertyIds.has(v.property_id)) ? v.property_id : null,
    scheduled_at: v.scheduled_at || new Date().toISOString(),
    status: v.status || 'Programmee',
    escort_agent: v.escort_agent || 'Karim Benali',
    client_name: v.client_name,
    client_phone: v.client_phone,
    notes: v.notes || null,
    outcome: v.outcome || null,
    created_at: v.created_at || new Date().toISOString()
  }));

  const { error: visErr } = await supabase.from('visits').upsert(visitsToInsert, { onConflict: 'id' });
  if (visErr) {
    console.error('Error inserting visits:', visErr.message);
    report.errors.push(`visits: ${visErr.message}`);
  } else {
    console.log(`✓ ${visitsToInsert.length} visits migrated.`);
    report.counts.visits = visitsToInsert.length;
  }

  // 8. Migrate Site Settings
  console.log('--> Migrating site_settings...');
  const settingsToInsert = [];
  if (rawDb.site_settings) {
    for (const [key, value] of Object.entries(rawDb.site_settings)) {
      settingsToInsert.push({
        key,
        value,
        description: `Configuration ${key}`,
        updated_at: new Date().toISOString()
      });
    }
  }

  const { error: setErr } = await supabase.from('site_settings').upsert(settingsToInsert, { onConflict: 'key' });
  if (setErr) {
    console.error('Error inserting site_settings:', setErr.message);
    report.errors.push(`site_settings: ${setErr.message}`);
  } else {
    console.log(`✓ ${settingsToInsert.length} site settings migrated.`);
    report.counts.site_settings = settingsToInsert.length;
  }

  // 9. Migrate Moderation History (only for valid properties)
  console.log('--> Migrating moderation_history...');
  const modToInsert = (rawDb.moderation_history || [])
    .filter(m => m.property_id && validPropertyIds.has(m.property_id))
    .map(m => ({
      id: m.id,
      property_id: m.property_id,
      moderator_id: m.moderator_id || null,
      action: m.action || 'approved',
      reason: m.reason || '',
      notes: m.notes || '',
      created_at: m.created_at || new Date().toISOString()
    }));

  if (modToInsert.length > 0) {
    const { error: modErr } = await supabase.from('moderation_history').upsert(modToInsert, { onConflict: 'id' });
    if (modErr) {
      console.error('Error inserting moderation_history:', modErr.message);
      report.errors.push(`moderation_history: ${modErr.message}`);
    } else {
      console.log(`✓ ${modToInsert.length} moderation history records migrated.`);
      report.counts.moderation_history = modToInsert.length;
    }
  } else {
    report.counts.moderation_history = 0;
  }

  report.completedAt = new Date().toISOString();
  console.log('\n================================================================');
  console.log('MIGRATION REPORT SUMMARY:');
  console.log(JSON.stringify(report, null, 2));
  console.log('================================================================\n');

  return report;
}

if (require.main === module) {
  runMigration().then(() => process.exit(0)).catch(err => {
    console.error('Fatal migration error:', err);
    process.exit(1);
  });
}

module.exports = { runMigration };
