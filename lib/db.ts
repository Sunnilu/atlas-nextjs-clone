console.log('✅ POSTGRES_URL:', process.env.POSTGRES_URL);

// lib/db.ts
import { sql } from '@vercel/postgres';

export async function getTopics() {
  const result = await sql`SELECT id, title FROM topics ORDER BY title`;
  return result.rows;
}

export async function getTopicById(id: string) {
  const result = await sql`SELECT * FROM topics WHERE id = ${id} LIMIT 1`;
  return result.rows[0];
}

export async function getQuestionsByTopicId(topicId: string) {
  const result = await sql`
    SELECT id, title, votes
    FROM questions
    WHERE topic_id = ${topicId}
    ORDER BY votes DESC
  `;
  return result.rows;
}

export async function createTopic(title: string) {
  await sql`INSERT INTO topics (title) VALUES (${title})`;
}
