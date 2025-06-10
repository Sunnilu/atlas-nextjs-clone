import Link from 'next/link';
import { fetchTopic, fetchQuestions } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function TopicDetailPage({ params }: Props) {
  const { id } = params;

  // UUID validation: simple check (optional but defensive)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return notFound();

  const topic = await fetchTopic(id);
  const questions = await fetchQuestions(id);

  if (!topic) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{topic.title}</h1>
      <div className="space-y-4">
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/ui/questions/${q.id}`}
            className="block bg-[#00003C] border border-black p-5 text-white rounded hover:bg-[#00004F]"
          >
            {q.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
