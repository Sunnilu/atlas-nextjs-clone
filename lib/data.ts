import { sql } from "@vercel/postgres";
import { Question, Topic, User, Answer } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const result = await sql<User>`SELECT * FROM users`;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchTopics(): Promise<Topic[]> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics ORDER BY id DESC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string): Promise<Topic | null> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topic.");
  }
}

export async function fetchQuestions(topicId: string): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY votes DESC;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestionById(id: string): Promise<Question | null> {
  try {
    const result = await sql<Question>`SELECT * FROM questions WHERE id = ${id}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function fetchAnswersForQuestion(questionId: string): Promise<Answer[]> {
  try {
    const result = await sql<Answer>`
      SELECT * FROM answers WHERE question_id = ${questionId}
      ORDER BY accepted DESC, created_at ASC;
    `;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, ${question.votes})
      RETURNING *;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">): Promise<Topic> {
  try {
    const data = await sql<Topic>`
      INSERT INTO topics (title)
      VALUES (${topic.title}) RETURNING id, title;
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string): Promise<Question[]> {
  try {
    const data = await sql<Question>`
      UPDATE questions SET votes = votes + 1 WHERE id = ${id}
      RETURNING *;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function acceptAnswer(answerId: string): Promise<void> {
  try {
    await sql`UPDATE answers SET accepted = true WHERE id = ${answerId}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to accept answer.");
  }
}
