// app/api/answers/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { questionId, text } = await req.json();

    if (!questionId || !text) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await sql`
      INSERT INTO answers (question_id, text, accepted, created_at)
      VALUES (${questionId}, ${text}, false, NOW());
    `;

    return NextResponse.json({ message: 'Answer submitted' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json({ error: 'Failed to submit answer' }, { status: 500 });
  }
}
