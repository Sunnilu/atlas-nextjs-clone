// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Adjust path if needed

async function clearData() {
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  const users = [
    { name: "Alice", email: "alice@example.com", password: "password123" },
  ];

  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashed,
      },
    });
  }
}

async function seedTopics() {
  const topics = [
    { title: "Next.js" },
    { title: "React" },
    { title: "PostgreSQL" },
  ];

  for (const topic of topics) {
    await prisma.topic.create({
      data: { title: topic.title },
    });
  }
}

export async function GET() {
  try {
    await clearData();
    await seedUsers();
    await seedTopics();
    revalidatePath("/");

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
