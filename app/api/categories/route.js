import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function GET() {
  return NextResponse.json(
    {
      categories: database.categories || [],
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

