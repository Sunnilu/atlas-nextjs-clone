// app/ui/layout.tsx
import Link from 'next/link';
import { getTopics } from '@/lib/db';

export default async function UILayout({ children }: { children: React.ReactNode }) {
  let topics = [];

  try {
    topics = await getTopics();
  } catch (error) {
    console.error('⚠️ Fallback topics due to DB error:', error);
    topics = [
      { id: '1', title: 'Next.js' },
      { id: '2', title: 'React' },
    ];
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/ui/topics/${topic.id}`} className="text-blue-600 hover:underline">
                {topic.title}
              </Link>
            </li>
          ))}
          <li><Link href="/ui/topics/new">➕ New Topic</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
