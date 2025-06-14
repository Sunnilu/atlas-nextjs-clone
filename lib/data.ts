// lib/data.ts

import { sql } from '@vercel/postgres';
import { Question, Topic, User, Answer } from './definitions';

// Fetch a single user by email
export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  try {
    const result = await sql<User>`SELECT * FROM users`;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// Fetch all topics
export async function fetchTopics(): Promise<Topic[]> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics ORDER BY id DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch topics.');
  }
}

// Fetch a single topic by ID
export async function fetchTopic(id: string): Promise<Topic | null> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch topic.');
  }
}

// Fetch questions for a topic
export async function fetchQuestions(topicId: string): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY votes DESC;
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch questions.');
  }
}

// Fetch a single question by ID
export async function fetchQuestionById(id: string): Promise<Question | null> {
  try {
    const result = await sql<Question>`SELECT * FROM questions WHERE id = ${id}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

// Fetch answers for a question
export async function fetchAnswersForQuestion(questionId: string): Promise<Answer[]> {
  try {
    const result = await sql<Answer>`
      SELECT * FROM answers WHERE question_id = ${questionId}
      ORDER BY accepted DESC, created_at ASC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// Insert a new question
export async function insertQuestion(
  question: Pick<Question, 'title' | 'topic_id' | 'votes'>
): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, ${question.votes})
      RETURNING *;
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add question.');
  }
}

// Insert a new topic
export async function insertTopic(
  topic: Pick<Topic, 'title'>
): Promise<{ id: string; title: string }> {
  try {
    const data = await sql<{ id: string; title: string }>`
      INSERT INTO topics (title)
      VALUES (${topic.title})
      RETURNING id, title;
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add topic.');
  }
}

// Increment question votes
export async function incrementVotes(id: string): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      UPDATE questions SET votes = votes + 1 WHERE id = ${id}
      RETURNING *;
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to increment votes.');
  }
}

// Accept an answer — update the question’s answer_id field
export async function acceptAnswer(questionId: string, answerId: string): Promise<void> {
  try {
    await sql`
      UPDATE questions
      SET answer_id = ${answerId}
      WHERE id = ${questionId};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to mark accepted answer.');
  }
}

// Insert a new answer
export async function insertAnswer(
  answer: Pick<Answer, 'question_id' | 'text'>
): Promise<Answer> {
  try {
    const result = await sql<Answer>`
      INSERT INTO answers (question_id, text, accepted, created_at)
      VALUES (${answer.question_id}, ${answer.text}, false, NOW())
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to submit answer.');
  }
}
