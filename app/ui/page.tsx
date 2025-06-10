// app/ui/page.tsx
import Link from 'next/link';
import { fetchTopics } from '@/lib/data';

export default async function UIPage() {
  const topics = await fetchTopics();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">All Topics</h1>
      <div className="space-y-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/ui/topics/${topic.id}`}
            className="block bg-[#00003C] border border-black p-5 text-white rounded hover:bg-[#00004F]"
          >
            {topic.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
