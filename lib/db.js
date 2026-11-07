import { getSupabaseAdmin } from './supabase-server.js';

// ==============================================================================
// 1. AUDIT LOGS
// ==============================================================================
export async function logAuditEvent({ userId, userEmail, action, entityType, entityId, details, req }) {
  try {
    const supabase = getSupabaseAdmin();
    let ipAddress = 'unknown';
    let userAgent = 'unknown';

    if (req) {
      ipAddress = req.headers?.get?.('x-forwarded-for') || req.headers?.get?.('x-real-ip') || '127.0.0.1';
      userAgent = req.headers?.get?.('user-agent') || 'internal';
    }

    await supabase.from('audit_logs').insert({
      user_id: userId || null,
      user_email: userEmail || 'system',
      action,
      entity_type: entityType,
      entity_id: String(entityId || ''),
      details: details || {},
      ip_address: ipAddress,
      user_agent: userAgent
    });
  } catch (err) {
    console.error('Audit log failure:', err.message);
  }
}

// ==============================================================================
// 2. PROPERTIES CRUD & WORKFLOW
// ==============================================================================
export async function getProperties({
  search = '',
  status = 'all',
  transaction = 'all',
  category = 'all',
  wilaya = 'all',
  featured = null,
  sort = 'recent',
  page = 1,
  limit = 50,
  includeDemo = true
} = {}) {
  const supabase = getSupabaseAdmin();

  let query = supabase.from('properties').select('*', { count: 'exact' });

  // Status filter
  if (status && status !== 'all') {
    query = query.eq('publication_status', status);
  }

  // Transaction type filter
  if (transaction && transaction !== 'all') {
    query = query.eq('transaction_type', transaction);
  }

  // Category filter
  if (category && category !== 'all') {
    query = query.or(`category_id.eq.${category},category_name.ilike.%${category}%`);
  }

  // Wilaya filter
  if (wilaya && wilaya !== 'all') {
    if (!isNaN(wilaya)) {
      query = query.eq('wilaya_code', Number(wilaya));
    } else {
      query = query.ilike('wilaya_name', `%${wilaya}%`);
    }
  }

  // Featured filter
  if (featured === true || featured === 'true') {
    query = query.eq('is_featured', true);
  }

  // Search query
  if (search) {
    const s = search.trim();
    query = query.or(`title.ilike.%${s}%,ref.ilike.%${s}%,commune.ilike.%${s}%,wilaya_name.ilike.%${s}%,owner_name.ilike.%${s}%`);
  }

  // Sorting
  if (sort === 'price_desc') {
    query = query.order('price', { ascending: false });
  } else if (sort === 'price_asc') {
    query = query.order('price', { ascending: true });
  } else if (sort === 'views') {
    query = query.order('views_count', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  // Pagination
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const from = (pageNum - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  const { data: properties, error, count } = await query;
  if (error) {
    console.error('getProperties error:', error);
    throw new Error(error.message);
  }

  // Compute status counts for admin badge stats
  const { data: allStatuses } = await supabase
    .from('properties')
    .select('publication_status, is_featured');

  const counts = {
    all: allStatuses?.length || 0,
    published: allStatuses?.filter(p => p.publication_status === 'publie').length || 0,
    moderation: allStatuses?.filter(p => p.publication_status === 'moderation').length || 0,
    drafts: allStatuses?.filter(p => p.publication_status === 'brouillon').length || 0,
    archived: allStatuses?.filter(p => p.publication_status === 'archive').length || 0,
    featured: allStatuses?.filter(p => Boolean(p.is_featured)).length || 0,
  };

  return {
    properties: properties || [],
    total: count || 0,
    page: pageNum,
    pageSize,
    counts
  };
}

export async function getPropertyById(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .or(`id.eq.${id},ref.eq.${id}`)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('getPropertyById error:', error);
    throw new Error(error.message);
  }
  return data || null;
}

export async function createProperty(propertyData, actor) {
  const supabase = getSupabaseAdmin();

  // Generate unique ref if not provided
  let ref = propertyData.ref;
  if (!ref) {
    const prefix = propertyData.transaction_type === 'location' ? 'PH-LOC' : 'PH-ALG';
    const rand = Math.floor(100 + Math.random() * 900);
    ref = `${prefix}-${rand}`;
  }

  // Normalize status if legacy en_attente is passed
  let status = propertyData.publication_status || 'brouillon';
  if (status === 'en_attente') status = 'moderation';

  const payload = {
    ...propertyData,
    ref,
    category_name: propertyData.category_name || 'Villa Contemporaine',
    wilaya_name: propertyData.wilaya_name || 'Alger',
    commune: propertyData.commune || 'Hydra',
    publication_status: status,
    price: Number(propertyData.price || 0),
    currency: propertyData.currency || 'DZD',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('properties')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('createProperty error:', error);
    throw new Error(error.message);
  }

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'PROPERTY_CREATE',
    entityType: 'property',
    entityId: data.id,
    details: { ref: data.ref, title: data.title }
  });

  return data;
}

export async function updateProperty(id, updates, actor) {
  const supabase = getSupabaseAdmin();

  const cleanUpdates = { ...updates };
  if (cleanUpdates.publication_status === 'en_attente') {
    cleanUpdates.publication_status = 'moderation';
  }

  const { data, error } = await supabase
    .from('properties')
    .update({
      ...cleanUpdates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateProperty error:', error);
    throw new Error(error.message);
  }

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'PROPERTY_UPDATE',
    entityType: 'property',
    entityId: id,
    details: { ref: data.ref, updatedFields: Object.keys(updates) }
  });

  return data;
}

export async function deleteProperty(id, actor) {
  const supabase = getSupabaseAdmin();

  // First fetch property to log details
  const { data: prop } = await supabase.from('properties').select('ref, title').eq('id', id).single();

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteProperty error:', error);
    throw new Error(error.message);
  }

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'PROPERTY_DELETE',
    entityType: 'property',
    entityId: id,
    details: { ref: prop?.ref, title: prop?.title }
  });

  return true;
}

export async function archiveProperty(id, actor) {
  return updateProperty(id, { publication_status: 'archive' }, actor);
}

export async function duplicateProperty(id, actor) {
  const original = await getPropertyById(id);
  if (!original) throw new Error('Propriété non trouvée');

  const { id: _origId, created_at: _c, updated_at: _u, ...rest } = original;

  // Clean base ref and ensure length fits in VARCHAR(50)
  const baseRef = String(original.ref || 'PH-PROP').replace(/-COPIE-\d+$/i, '');
  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const newRef = `${baseRef.slice(0, 38)}-COPIE-${randSuffix}`;
  const newTitle = original.title.includes('(Copie)') ? original.title : `${original.title} (Copie)`;

  return createProperty({
    ...rest,
    ref: newRef,
    title: newTitle,
    publication_status: 'brouillon',
    views_count: 0
  }, actor);
}

export async function toggleFeaturedProperty(id, actor) {
  const original = await getPropertyById(id);
  if (!original) throw new Error('Propriété non trouvée');

  const nextState = !original.is_featured;
  return updateProperty(id, { is_featured: nextState }, actor);
}

export async function togglePublishProperty(id, actor) {
  const original = await getPropertyById(id);
  if (!original) throw new Error('Propriété non trouvée');

  const nextStatus = original.publication_status === 'publie' ? 'brouillon' : 'publie';
  return updateProperty(id, { publication_status: nextStatus }, actor);
}

// ==============================================================================
// 3. CATEGORIES & WILAYAS
// ==============================================================================
export async function getCategories() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getWilayas() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('wilayas')
    .select('*')
    .eq('is_active', true)
    .order('code', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

// ==============================================================================
// 4. INQUIRIES & CRM
// ==============================================================================
export async function getInquiries({ status = 'all', propertyId = null } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (propertyId) {
    query = query.eq('property_id', propertyId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createInquiry(inquiryData) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{
      ...inquiryData,
      status: inquiryData.status || 'Nouveau',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateInquiry(id, updates, actor) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('inquiries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'INQUIRY_UPDATE',
    entityType: 'inquiry',
    entityId: id,
    details: updates
  });

  return data;
}

// ==============================================================================
// 5. VISITS
// ==============================================================================
export async function getVisits({ status = 'all' } = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from('visits').select('*').order('scheduled_at', { ascending: true });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createVisit(visitData, actor) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('visits')
    .insert([{
      ...visitData,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'VISIT_CREATE',
    entityType: 'visit',
    entityId: data.id,
    details: visitData
  });

  return data;
}

// ==============================================================================
// 6. SITE SETTINGS & CMS
// ==============================================================================
export async function getSiteSettings() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) throw new Error(error.message);

  const settingsMap = {};
  (data || []).forEach(item => {
    settingsMap[item.key] = item.value;
  });
  return settingsMap;
}

export async function updateSiteSetting(key, value, actor) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await logAuditEvent({
    userId: actor?.id,
    userEmail: actor?.email,
    action: 'SITE_SETTING_UPDATE',
    entityType: 'setting',
    entityId: key,
    details: { key, value }
  });

  return data;
}

// ==============================================================================
// 7. MODERATION WORKFLOW
// ==============================================================================
export async function getModerationQueue() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('publication_status', 'moderation')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function moderateProperty(id, action, reason, notes, moderator) {
  const supabase = getSupabaseAdmin();

  let nextStatus = 'moderation';
  if (action === 'approved') nextStatus = 'publie';
  if (action === 'rejected') nextStatus = 'rejete';
  if (action === 'correction_requested') nextStatus = 'brouillon';

  const { data: updatedProp, error: propErr } = await supabase
    .from('properties')
    .update({
      publication_status: nextStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (propErr) throw new Error(propErr.message);

  await supabase.from('moderation_history').insert({
    property_id: id,
    moderator_id: moderator?.id || 'system',
    action,
    reason: reason || '',
    notes: notes || '',
    created_at: new Date().toISOString()
  });

  await logAuditEvent({
    userId: moderator?.id,
    userEmail: moderator?.email,
    action: `PROPERTY_MODERATE_${action.toUpperCase()}`,
    entityType: 'property',
    entityId: id,
    details: { action, reason, notes, resultingStatus: nextStatus }
  });

  return updatedProp;
}

