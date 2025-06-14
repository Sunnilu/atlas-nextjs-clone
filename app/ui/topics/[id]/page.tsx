// app/ui/topics/[id]/page.tsx
import Link from 'next/link';
import { fetchTopic, fetchQuestions } from '@/lib/data';

interface Props {
  params: { id: string };
}

export default async function TopicDetailPage({ params }: Props) {
  const { id } = params;
  const topic = await fetchTopic(id);
  const questions = await fetchQuestions(id);

  if (!topic) {
    return <div className="text-white p-6">Topic not found.</div>;
  }

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
