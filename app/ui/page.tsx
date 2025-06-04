// app/ui/page.tsx
import Link from 'next/link';
import { getTopics } from '@/lib/db';

export default async function UIPage() {
  let topics = [];

  try {
    topics = await getTopics();
  } catch (error) {
    console.warn('⚠️ Fallback topics due to DB error:', error);
    topics = [
      { id: '1', title: 'Next.js' },
      { id: '2', title: 'React' },
    ];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/ui/topics/${topic.id}`} className="text-blue-600 hover:underline">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
