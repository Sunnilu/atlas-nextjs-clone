// app/api/topics/[id]/questions/route.ts
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

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
