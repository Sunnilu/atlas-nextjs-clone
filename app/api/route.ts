import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title || title.trim() === '') {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    const client = await db.connect();
    const result = await client.sql`INSERT INTO topics (title) VALUES (${title}) RETURNING id, title`;
    client.release(); // 👈 Don't forget to release the connection

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}
