import { NextResponse } from 'next/server';
import database from '@/data/database.json';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  const inquiries = database.inquiries || [];
  return NextResponse.json(
    {
      inquiries,
      total: inquiries.length,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...body,
      status: body.status || 'nouveau',
    };
    return NextResponse.json(
      {
        success: true,
        inquiry: newInquiry,
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch {
    return NextResponse.json({ success: false, error: 'Données invalides' }, { status: 400 });
  }
}

