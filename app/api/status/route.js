import { NextResponse } from 'next/server';
import { getProperties, getInquiries, getCategories, getWilayas } from '@/lib/db';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Verify DB connectivity
    const startTime = Date.now();
    const { data: dbCheck, error: dbErr } = await supabase.from('properties').select('id').limit(1);
    const latencyMs = Date.now() - startTime;

    const { counts } = await getProperties({ limit: 1 });
    const inquiries = await getInquiries();
    const categories = await getCategories();
    const wilayas = await getWilayas();

    return NextResponse.json({
      status: dbErr ? 'degraded' : 'healthy',
      database: 'Supabase PostgreSQL (Active Healthy)',
      latencyMs: `${latencyMs}ms`,
      app: 'Prime House Real Estate Production Portal',
      version: '2.0.0-Production',
      counts: {
        properties: counts.all,
        published: counts.published,
        moderation: counts.moderation,
        drafts: counts.drafts,
        archived: counts.archived,
        featured: counts.featured,
        inquiries: inquiries.length,
        categories: categories.length,
        wilayas: wilayas.length,
      },
      time: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      database: 'Disconnected',
      error: err.message,
      time: new Date().toISOString()
    }, { status: 500 });
  }
}
