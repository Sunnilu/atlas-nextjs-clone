// app/ui/page.tsx

import Link from "next/link";
import { db } from "@vercel/postgres";

export default async function UIPage() {
  const client = await db.connect();

  const topicsResult = await client.sql`
    SELECT id, title FROM topics
  `;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {topicsResult.rows.map((topic) => (
          <li key={topic.id}>
            <Link href={`/ui/topics/${topic.id}`} className="text-blue-600 underline">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

