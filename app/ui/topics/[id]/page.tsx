// app/ui/topics/[id]/page.tsx
import { db } from "@vercel/postgres";

export default async function TopicDetails({ params }: { params: { id: string } }) {
  const client = await db.connect();

  // Fetch topic title (optional)
  const topicResult = await client.sql`
    SELECT title FROM topics WHERE id = ${params.id} LIMIT 1
  `;
  const topicTitle = topicResult.rows[0]?.title || "Unknown Topic";

  // Fetch questions for this topic
  const questionsResult = await client.sql`
    SELECT id, title, votes FROM questions WHERE topic_id = ${params.id}
  `;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topicTitle}</h1>
      <ul className="space-y-2">
        {questionsResult.rows.map((q) => (
          <li key={q.id} className="border p-2 rounded">
            <span className="font-medium">{q.title}</span>
            <span className="text-sm text-gray-600 ml-2">(Votes: {q.votes})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
