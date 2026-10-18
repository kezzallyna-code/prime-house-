-- ==============================================================================
-- PRIME HOUSE REAL ESTATE PORTAL - DATABASE MIGRATION 01: CORE SCHEMA
-- Database: PostgreSQL 15+ (Supabase)
-- Dialect: PostgreSQL with Row Level Security (RLS)
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE: profiles (Administrative Personnel & Agents)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator', 'agent')) DEFAULT 'admin',
    phone TEXT,
    matricule TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 2. TABLE: categories (Property Categories / Typologies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    description_ar TEXT,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('vente', 'location')),
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    category_name TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL CHECK (price >= 0),
    price_period TEXT DEFAULT 'month',
    price_negotiable BOOLEAN NOT NULL DEFAULT false,
    wilaya_code INTEGER REFERENCES public.wilayas(code) ON DELETE RESTRICT,
    wilaya_name TEXT NOT NULL,
    commune TEXT NOT NULL,
    address TEXT,
    cadastral_section TEXT,
    cadastral_number TEXT,
    surface_habitable NUMERIC(10, 2) CHECK (surface_habitable >= 0),
    surface_terrain NUMERIC(10, 2) CHECK (surface_terrain >= 0),
    bedrooms INTEGER NOT NULL DEFAULT 0,
    bathrooms INTEGER NOT NULL DEFAULT 0,
    garage_spaces INTEGER NOT NULL DEFAULT 0,
    floors INTEGER NOT NULL DEFAULT 1,
    year_built INTEGER,
    amenities TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    legal_status TEXT,
    publication_status TEXT NOT NULL CHECK (publication_status IN ('publie', 'moderation', 'brouillon', 'archive')) DEFAULT 'moderation',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    featured_order INTEGER,
    owner_name TEXT,
    owner_phone TEXT,
    owner_email TEXT,
    owner_type TEXT CHECK (owner_type IN ('particulier', 'agence', 'promoteur', 'direction')) DEFAULT 'direction',
    main_image TEXT,
    views_count INTEGER NOT NULL DEFAULT 0,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_publication_status ON public.properties(publication_status);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON public.properties(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON public.properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_wilaya ON public.properties(wilaya_code);
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties(category_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);

-- ==============================================================================
-- 5. TABLE: property_images (Multiple Photos per Listing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    caption TEXT,
    is_main BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);

-- ==============================================================================
-- 6. TABLE: inquiries (Customer Inquiries, Leads & Viewing Requests)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    property_ref TEXT,
    property_title TEXT,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT NOT NULL,
    inquiry_type TEXT NOT NULL DEFAULT 'Demande de visite privée',
    message TEXT,
    status TEXT NOT NULL CHECK (status IN ('Nouveau', 'En cours', 'Contacté', 'Visite programmée', 'Terminé', 'Annulé')) DEFAULT 'Nouveau',
    visit_date TIMESTAMPTZ,
    internal_notes TEXT,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- ==============================================================================
-- 7. TABLE: visits (Scheduled Private Viewings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID REFERENCES public.inquiries(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Programmee', 'Confirmee', 'Effectuee', 'Annulee')) DEFAULT 'Programmee',
    escort_agent TEXT,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visits_scheduled_at ON public.visits(scheduled_at);

-- ==============================================================================
-- 8. TABLE: site_settings (Agency Information, Contact, Social & VIP Settings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 9. TABLE: moderation_history (Audit Trail for Property Approvals/Rejections)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.moderation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    moderator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'correction_requested')),
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wilayas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_history ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
          AND role IN ('super_admin', 'admin', 'moderator')
          AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- PROFILES POLICIES ---
CREATE POLICY "Users can read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- --- CATEGORIES POLICIES ---
CREATE POLICY "Public can view active categories"
    ON public.categories FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins have full management on categories"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- --- WILAYAS POLICIES ---
CREATE POLICY "Public can view active wilayas"
    ON public.wilayas FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins have full management on wilayas"
    ON public.wilayas FOR ALL
    USING (public.is_admin());

-- --- PROPERTIES POLICIES ---
CREATE POLICY "Public can view published properties"
    ON public.properties FOR SELECT
    USING (publication_status = 'publie' OR public.is_admin());

CREATE POLICY "Admins have full access on properties"
    ON public.properties FOR ALL
    USING (public.is_admin());

-- Allow public users to submit a property for moderation (deposer annonce)
CREATE POLICY "Public can insert properties in moderation"
    ON public.properties FOR INSERT
    WITH CHECK (publication_status = 'moderation');

-- --- PROPERTY IMAGES POLICIES ---
CREATE POLICY "Public can view images of published properties"
    ON public.property_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.properties
            WHERE properties.id = property_images.property_id
              AND (properties.publication_status = 'publie' OR public.is_admin())
        )
    );

CREATE POLICY "Admins have full access to property images"
    ON public.property_images FOR ALL
    USING (public.is_admin());

-- --- INQUIRIES POLICIES ---
-- Public visitors can submit inquiries
CREATE POLICY "Public can submit inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- Only admins can view, update, delete inquiries and internal notes
CREATE POLICY "Admins only can manage inquiries"
    ON public.inquiries FOR ALL
    USING (public.is_admin());

-- --- VISITS POLICIES ---
CREATE POLICY "Admins only can manage visits"
    ON public.visits FOR ALL
    USING (public.is_admin());

-- --- SITE SETTINGS POLICIES ---
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

CREATE POLICY "Admins only can update site settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin());

-- --- MODERATION HISTORY POLICIES ---
CREATE POLICY "Admins only can access moderation history"
    ON public.moderation_history FOR ALL
    USING (public.is_admin());

-- ==============================================================================
-- 11. AUTOMATIC UPDATED_AT TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_visits_updated_at
    BEFORE UPDATE ON public.visits
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
