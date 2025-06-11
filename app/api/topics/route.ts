// app/api/topics/route.ts
import { fetchTopics } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const topics = await fetchTopics();

    return NextResponse.json(
      topics.map(({ id, title }) => ({ id, title }))
    );
  } catch (error) {
    console.error('❌ Failed to fetch topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics.' },
      { status: 500 }
    );
  }
}
