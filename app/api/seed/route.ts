import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
const client = await db.connect();

async function clearData() {
  await client.sql`DROP TABLE IF EXISTS answers`;
  await client.sql`DROP TABLE IF EXISTS questions`;
  await client.sql`DROP TABLE IF EXISTS topics`;
  await client.sql`DROP TABLE IF EXISTS users`;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  await client.sql`DELETE FROM users`;
  const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com', password: 'password123' },
  ];
  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await client.sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashed})
    `;
  }
}

// Repeat this pattern for seedTopics(), seedQuestions(), seedAnswers()
