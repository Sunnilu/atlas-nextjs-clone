// app/api/questions/[id]/vote/route.ts
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const questionId = params.id;

  if (!questionId) {
    return NextResponse.json(
      { error: 'Question ID is required.' },
      { status: 400 }
    );
  }

  try {
    const client = await db.connect();
    await client.sql`
      UPDATE questions
      SET votes = votes + 1
      WHERE id = ${questionId}
    `;

    return NextResponse.json({ message: 'Vote counted!' });
  } catch (error) {
    console.error('❌ Error incrementing vote:', error);
    return NextResponse.json(
      { error: 'Could not increment vote.' },
      { status: 500 }
    );
  }
}
