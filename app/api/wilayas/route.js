import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function GET() {
  const list = database.wilayas || [];
  return NextResponse.json(
    {
      wilayas: list,
      total: list.length,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

