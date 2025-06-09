// app/api/answers/[id]/accept/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function PATCH(_: Request, { params }: Params) {
  const answerId = params.id;

  try {
    // Get the question_id for the given answer
    const result = await sql<{ question_id: string }>`
      SELECT question_id FROM answers WHERE id = ${answerId} LIMIT 1;
    `;
    const questionId = result.rows[0]?.question_id;

    if (!questionId) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }

    // Reset accepted answers for the question
    await sql`UPDATE answers SET accepted = false WHERE question_id = ${questionId};`;

    // Set the selected answer as accepted
    await sql`UPDATE answers SET accepted = true WHERE id = ${answerId};`;

    return NextResponse.json({ message: 'Answer marked as accepted' });
  } catch (error) {
    console.error('Error accepting answer:', error);
    return NextResponse.json({ error: 'Failed to accept answer' }, { status: 500 });
  }
}
