'use client';

import Link from 'next/link';
import { getTopics } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UILayout({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<{ id: string; title: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics');
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error('⚠️ Failed to fetch topics:', error);
        setTopics([
          { id: '1', title: 'Next.js' },
          { id: '2', title: 'React' },
        ]);
      }
    }

    fetchTopics();
  }, []);

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
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
          <li><Link href="/ui/topics/new">➕ New Topic</Link></li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-6 text-red-600 text-sm hover:underline"
        >
          🚪 Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
