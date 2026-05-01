import { NextResponse } from 'next/server';
import gplay from 'google-play-scraper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const term = searchParams.get('q') as string;
    const num = parseInt(searchParams.get('num') as string) || 30;
    if (!term) return NextResponse.json([]);
    const results = await gplay.search({ term, num });
    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
