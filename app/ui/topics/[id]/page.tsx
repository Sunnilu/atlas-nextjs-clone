import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchTopic, fetchQuestions } from '@/lib/data';

interface Props {
  params: { id: string };
}

export default async function TopicDetailPage({ params }: Props) {
  const topic = await fetchTopic(params.id);
  const questions = await fetchQuestions(params.id);

  if (!topic) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">#{topic.title}</h1>
      
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions yet for this topic.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((question) => (
            <li key={question.id}>
              <Link
                href={`/ui/questions/${question.id}`}
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {question.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
