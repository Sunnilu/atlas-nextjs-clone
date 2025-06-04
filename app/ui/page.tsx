// app/ui/page.tsx

import Link from 'next/link';
import { getTopics } from '@/lib/db';

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Topics</h1>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={`/ui/topics/${topic.id}`}
              className="text-blue-600 hover:underline"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
