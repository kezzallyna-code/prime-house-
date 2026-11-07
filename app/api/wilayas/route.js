import { NextResponse } from 'next/server';
import { getWilayas } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const wilayas = await getWilayas();
    return NextResponse.json({
      success: true,
      wilayas,
      total: wilayas.length
    });
  } catch (err) {
    console.error('GET /api/wilayas error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur récupération wilayas.' },
      { status: 500 }
    );
  }
}
