import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function GET() {
  const properties = database.properties || [];
  const inquiries = database.inquiries || [];
  const categories = database.categories || [];
  const wilayas = database.wilayas || [];

  return NextResponse.json(
    {
      status: 'online',
      app: 'Prime House Real Estate Admin Console',
      version: '2.0.0-Next.js',
      node: 'Next.js App Router on Vercel',
      counts: {
        properties: properties.length,
        published: properties.filter((p) => p.publication_status === 'publie').length,
        moderation: properties.filter((p) => p.publication_status === 'moderation').length,
        featured: properties.filter((p) => p.is_featured).length,
        inquiries: inquiries.length,
        categories: categories.length,
        wilayas: wilayas.length,
      },
      time: new Date().toISOString(),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

