// app/api/topics/[id]/questions/route.ts
import { db } from '@vercel/postgres';
import { fetchQuestions } from '@/lib/data';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

// Handle GET: return all questions for a given topic
export async function GET(req: Request, { params }: Params) {
  const topicId = params.id;

  if (!topicId) {
    return NextResponse.json(
      { error: 'Topic ID is required.' },
      { status: 400 }
    );
  }

  try {
    const questions = await fetchQuestions(topicId);
    return NextResponse.json(
      questions.map(({ id, title, topic_id, votes }) => ({
        id,
        title,
        topic_id,
        votes,
      }))
    );
  } catch (error) {
    console.error('❌ Failed to fetch questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions.' },
      { status: 500 }
    );
  }
}

// Handle POST: create a new question for a topic
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const topicId = params.id;

  if (!topicId) {
    return NextResponse.json(
      { error: 'Topic ID is required.' },
      { status: 400 }
    );
  }

  try {
    const { title } = await req.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing question title.' },
        { status: 400 }
      );
    }

    const client = await db.connect();
    await client.sql`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${title}, ${topicId}, 0)
    `;

    return NextResponse.json({ message: 'Question created successfully.' });
  } catch (error) {
    console.error('❌ Failed to create question:', error);
    return NextResponse.json(
      { error: 'Failed to create question.' },
      { status: 500 }
    );
  }
}
