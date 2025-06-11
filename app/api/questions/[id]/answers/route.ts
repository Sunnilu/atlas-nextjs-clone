// app/api/questions/[id]/answers/route.ts
import { fetchAnswersForQuestion } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const questionId = params.id;

  if (!questionId) {
    return NextResponse.json({ error: 'Question ID is required.' }, { status: 400 });
  }

  try {
    const answers = await fetchAnswersForQuestion(questionId);

    return NextResponse.json(
      answers.map(({ id, text, question_id }) => ({ id, text, question_id }))
    );
  } catch (error) {
    console.error('❌ Failed to fetch answers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answers.' },
      { status: 500 }
    );
  }
}
