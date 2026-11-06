import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function GET() {
  return NextResponse.json(database.site_settings || {}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}

