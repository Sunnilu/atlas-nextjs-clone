// app/ui/topics/[id]/page.tsx
import { getTopicById, getQuestionsByTopicId } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function TopicDetails({ params }: { params: { id: string } }) {
  const topic = await getTopicById(params.id);
  if (!topic) return notFound();

  const questions = await getQuestionsByTopicId(params.id);

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

