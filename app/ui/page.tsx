import Link from 'next/link';
import { fetchTopics } from '@/lib/data';

export default async function TopicsPage() {
  const topics = await fetchTopics();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Topics</h1>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/ui/topics/${topic.id}`}
              className="block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

