-- ==============================================================================
-- PRIME HOUSE REAL ESTATE PORTAL - DATABASE MIGRATION 03: STORAGE POLICIES
-- Supabase Storage Configuration for Real Property Images & Documents
-- ==============================================================================

-- 1. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('properties', 'properties', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('documents', 'documents', false, 20971520, ARRAY['application/pdf', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies for 'properties' bucket
-- Allow public users to view images
CREATE POLICY "Public Read Access for Properties Bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'properties');

-- Allow authenticated administrators to upload images
CREATE POLICY "Admins Upload Access for Properties Bucket"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'properties'
        AND (auth.role() = 'authenticated' OR public.is_admin())
    );

-- Allow authenticated administrators to update/delete images
CREATE POLICY "Admins Delete Access for Properties Bucket"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'properties'
        AND (auth.role() = 'authenticated' OR public.is_admin())
    );

CREATE POLICY "Admins Update Access for Properties Bucket"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'properties'
        AND (auth.role() = 'authenticated' OR public.is_admin())
    );

-- 3. Storage Policies for 'documents' bucket (Cadastre, Actes Notariés)
-- Private bucket: only admins and uploader can access
CREATE POLICY "Admins Access for Documents Bucket"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'documents'
        AND (auth.role() = 'authenticated' OR public.is_admin())
    );
