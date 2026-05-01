import { NextResponse } from 'next/server';
import gplay from 'google-play-scraper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const collection = searchParams.get('collection') as any || 'TOP_FREE';
    const category = searchParams.get('category') as any;
    const num = parseInt(searchParams.get('num') as string) || 30;

    const results = await gplay.list({
      collection,
      category,
      num
    });
    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
