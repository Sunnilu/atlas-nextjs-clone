// app/ui/topics/[id]/page.tsx
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function TopicDetails({ params }: { params: { id: string } }) {
  let topic;
  let questions = [];

  try {
    const topicResult = await sql`
      SELECT * FROM topics WHERE id = ${params.id} LIMIT 1
    `;
    if (topicResult.rows.length === 0) return notFound();

    topic = topicResult.rows[0];

    const questionsResult = await sql`
      SELECT id, title, votes FROM questions WHERE topic_id = ${params.id}
      ORDER BY votes DESC
    `;
    questions = questionsResult.rows;
  } catch (error) {
    console.error('❌ Error fetching topic or questions:', error);
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="border p-2 rounded">
              <strong>{q.title}</strong>
              <span className="ml-2 text-sm text-gray-500">(Votes: {q.votes})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
