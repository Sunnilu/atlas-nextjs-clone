// lib/db.ts
import { createClient } from '@vercel/postgres';

export async function getTopics() {
  const client = createClient();
  await client.connect();

  const result = await client.sql`SELECT id, title FROM topics ORDER BY title`;
  return result.rows;
}

export async function getTopicById(id: string) {
  const client = createClient();
  await client.connect();

  const result = await client.sql`SELECT * FROM topics WHERE id = ${id} LIMIT 1`;
  return result.rows[0];
}

export async function getQuestionsByTopicId(topicId: string) {
  const client = createClient();
  await client.connect();

  const result = await client.sql`
    SELECT id, title, votes
    FROM questions
    WHERE topic_id = ${topicId}
    ORDER BY votes DESC
  `;
  return result.rows;
}

export async function createTopic(title: string) {
  const client = createClient();
  await client.connect();

  await client.sql`INSERT INTO topics (title) VALUES (${title})`;
}
