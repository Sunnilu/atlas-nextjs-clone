// app/ui/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import { getTopics } from '@/lib/db';

export default async function UILayout({ children }: { children: React.ReactNode }) {
  let topics: { id: string; title: string }[] = [];

  try {
    topics = (await getTopics()).map((row: any) => ({
      id: String(row.id),
      title: String(row.title),
    }));
  } catch (error) {
    console.error('❌ Failed to load topics from database:', error);
    // Fallback UI could be added here if needed
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
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
        <div className="mt-6 space-y-2">
          <Link href="/ui" className="block text-sm text-gray-700 hover:underline">
            🏠 Dashboard
          </Link>
          <Link
            href="/ui/topics/new"
            className="block text-sm text-gray-700 hover:underline"
          >
            ➕ New Topic
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
