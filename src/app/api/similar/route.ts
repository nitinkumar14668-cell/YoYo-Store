import { NextResponse } from 'next/server';
import gplay from 'google-play-scraper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const appId = searchParams.get('id') as string;
    if (!appId) throw new Error("Missing appId");
    const result = await gplay.similar({ appId });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
