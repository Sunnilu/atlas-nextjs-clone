// ✅ app/api/topics/route.ts
import { NextResponse } from 'next/server';
import { fetchTopics } from '@/lib/data';

export async function GET() {
  try {
    const topics = await fetchTopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}
