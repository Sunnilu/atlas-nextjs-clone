// app/ui/topics/[id]/page.tsx
import { getTopicById, getQuestionsByTopicId } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TopicDetails({ params }: { params: { id: string } }) {
  const topic = await getTopicById(params.id);
  if (!topic) return notFound();

  const questions = await getQuestionsByTopicId(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      <form action={`/api/topics/${params.id}/questions`} method="POST" className="mb-6 space-x-2">
        <input
          name="title"
          type="text"
          placeholder="Ask a question..."
          className="border p-2 w-1/2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Ask
        </button>
      </form>
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
