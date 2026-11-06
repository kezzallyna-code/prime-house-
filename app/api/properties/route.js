import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function GET() {
  const properties = database.properties || [];
  return NextResponse.json(
    {
      properties,
      total: properties.length,
      page: 1,
      limit: 100,
      totalPages: 1,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

