import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({
      success: true,
      categories
    });
  } catch (err) {
    console.error('GET /api/categories error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur récupération catégories.' },
      { status: 500 }
    );
  }
}
