-- ==============================================================================
-- PRIME HOUSE REAL ESTATE PORTAL - PRODUCTION DATABASE SCHEMA
-- Dialect: PostgreSQL 15+ (Supabase) with Row Level Security (RLS)
-- Preserves existing identifiers (Text IDs) & supports standard UUIDs
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE: admin_users (Personnel & Agents)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    matricule TEXT,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator', 'agent')) DEFAULT 'admin',
    title TEXT,
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 2. TABLE: categories (Property Categories / Typologies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT NOT NULL DEFAULT 'apartment',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. TABLE: wilayas (Algerian Wilayas & Localities)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wilayas (
    code INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    arabic_name TEXT,
    region TEXT NOT NULL DEFAULT 'Centre',
    communes JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 4. TABLE: properties (Real Estate Listings in Algeria)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    ref TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    title_ar TEXT,
    tagline TEXT,
    description TEXT,
    description_ar TEXT,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('vente', 'location')),
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    price_formatted TEXT,
    price_period TEXT,
    price_negotiable BOOLEAN NOT NULL DEFAULT false,
    currency TEXT NOT NULL DEFAULT 'DZD',
    wilaya_code INTEGER REFERENCES public.wilayas(code) ON DELETE SET NULL,
    wilaya_name TEXT NOT NULL,
    commune TEXT NOT NULL,
    address TEXT,
    cadastral_section TEXT,
    cadastral_number TEXT,
    surface_habitable NUMERIC(10, 2) DEFAULT 0,
    surface_terrain NUMERIC(10, 2) DEFAULT 0,
    bedrooms INTEGER NOT NULL DEFAULT 0,
    bathrooms INTEGER NOT NULL DEFAULT 0,
    living_rooms INTEGER NOT NULL DEFAULT 0,
    garage_spaces INTEGER NOT NULL DEFAULT 0,
    floors INTEGER NOT NULL DEFAULT 1,
    year_built INTEGER,
    amenities TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    legal_status TEXT,
    ownership_info JSONB DEFAULT '{}'::jsonb,
    publication_status TEXT NOT NULL CHECK (publication_status IN ('publie', 'moderation', 'brouillon', 'archive', 'rejete')) DEFAULT 'moderation',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    featured_order INTEGER,
    is_exclusive BOOLEAN NOT NULL DEFAULT false,
    is_demo BOOLEAN NOT NULL DEFAULT false,
    is_sold BOOLEAN NOT NULL DEFAULT false,
    is_rented BOOLEAN NOT NULL DEFAULT false,
    owner_name TEXT,
    owner_phone TEXT,
    owner_email TEXT,
    owner_type TEXT DEFAULT 'direction',
    agent_id TEXT REFERENCES public.admin_users(id) ON DELETE SET NULL,
    main_image TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    video_url TEXT,
    virtual_tour_url TEXT,
    views_count INTEGER NOT NULL DEFAULT 0,
    created_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_properties_publication_status ON public.properties(publication_status);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON public.properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_wilaya ON public.properties(wilaya_code);
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties(category_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_is_demo ON public.properties(is_demo);

-- ==============================================================================
-- 5. TABLE: property_images (Multiple Photos per Listing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    property_id TEXT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    storage_path TEXT,
    url TEXT NOT NULL,
    caption TEXT,
    is_main BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);

-- ==============================================================================
-- 6. TABLE: inquiries (Customer Inquiries, Leads & Private Viewing Requests)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
    property_ref TEXT,
    property_title TEXT,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT NOT NULL,
    inquiry_type TEXT NOT NULL DEFAULT 'Demande de visite privée',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'Nouveau',
    visit_date TIMESTAMPTZ,
    internal_notes TEXT,
    assigned_to TEXT REFERENCES public.admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- ==============================================================================
-- 7. TABLE: visits (Scheduled Private Viewings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.visits (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    inquiry_id TEXT REFERENCES public.inquiries(id) ON DELETE CASCADE,
    property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'Programmee',
    escort_agent TEXT,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    notes TEXT,
    outcome TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visits_scheduled_at ON public.visits(scheduled_at);

-- ==============================================================================
-- 8. TABLE: site_settings (Website configuration, CMS, Contact, Social, SEO)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 9. TABLE: moderation_history (Audit Trail for Property Approvals/Rejections)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.moderation_history (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    property_id TEXT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    moderator_id TEXT,
    action TEXT NOT NULL,
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 10. TABLE: audit_logs (Security & Admin Activity Audit)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT,
    user_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ==============================================================================
-- 11. STORAGE BUCKETS SETUP
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('properties', 'properties', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('documents', 'documents', false, 26214400, ARRAY['application/pdf', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wilayas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can view active categories
CREATE POLICY "Public can read categories" ON public.categories
    FOR SELECT USING (is_active = true);

-- Public can view active wilayas
CREATE POLICY "Public can read wilayas" ON public.wilayas
    FOR SELECT USING (is_active = true);

-- Public can view published properties
CREATE POLICY "Public can read published properties" ON public.properties
    FOR SELECT USING (publication_status = 'publie');

-- Public can submit new property for moderation (deposer annonce)
CREATE POLICY "Public can insert moderation property" ON public.properties
    FOR INSERT WITH CHECK (publication_status = 'moderation');

-- Public can view images for published properties
CREATE POLICY "Public can read published property images" ON public.property_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.properties
            WHERE properties.id = property_images.property_id
              AND properties.publication_status = 'publie'
        )
    );

-- Public can submit inquiries
CREATE POLICY "Public can insert inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Public can read site settings
CREATE POLICY "Public can read site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Storage bucket access
CREATE POLICY "Public Access for properties bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'properties');

-- Automatic updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_properties_updated_at ON public.properties;
CREATE TRIGGER trg_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER trg_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_visits_updated_at ON public.visits;
CREATE TRIGGER trg_visits_updated_at
    BEFORE UPDATE ON public.visits
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

