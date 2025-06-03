// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";

// Connect to the database
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
    { name: 'Alice', email: 'alice@example.com', password: 'password123' },
  ];

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await client.sql`
      INSERT INTO users (name, email, password)
      VALUES (${user.name}, ${user.email}, ${hashed})
    `;
  }
}

async function seedTopics() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS topics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;
  await client.sql`DELETE FROM topics`;

  const topics = [
    { title: "Next.js" },
    { title: "React" },
    { title: "PostgreSQL" },
  ];

  for (const topic of topics) {
    await client.sql`
      INSERT INTO topics (title)
      VALUES (${topic.title})
    `;
  }
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await clearData();
    await seedUsers();
    await seedTopics();
    await client.sql`COMMIT`;

    revalidatePath("/");

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}


// Repeat this pattern for seedTopics(), seedQuestions(), seedAnswers()
