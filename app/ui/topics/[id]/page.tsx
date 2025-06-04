// app/ui/topics/[id]/page.tsx

import { db } from "@vercel/postgres";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { FC } from "react";

interface TopicPageProps {
  params: {
    id: string;
  };
}

// Optional metadata function
export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  return {
    title: `Topic ${params.id}`,
  };
}

// ✅ Make sure this is an async server component
const TopicPage: FC<TopicPageProps> = async ({ params }) => {
  const client = await db.connect();

  const topicResult = await client.sql`
    SELECT title FROM topics WHERE id = ${params.id} LIMIT 1
  `;

  if (topicResult.rows.length === 0) {
    notFound();
  }

  const topicTitle = topicResult.rows[0].title;

  const questionsResult = await client.sql`
    SELECT id, title, votes FROM questions WHERE topic_id = ${params.id}
  `;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topicTitle}</h1>
      <ul className="space-y-2">
        {questionsResult.rows.map((q) => (
          <li key={q.id} className="border p-2 rounded">
            <strong>{q.title}</strong>{" "}
            <span className="text-sm text-gray-500">(Votes: {q.votes})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicPage;
