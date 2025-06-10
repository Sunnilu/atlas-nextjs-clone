// app/ui/layout.tsx
import { fetchTopics } from '@/lib/data';
import Link from 'next/link';

export default async function UILayout({ children }: { children: React.ReactNode }) {
  const topics = await fetchTopics();

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
          <li>
            <Link href="/ui/topics/new" className="text-green-600 hover:underline">
              ➕ New Topic
            </Link>
          </li>
        </ul>

        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="mt-6 text-red-600 text-sm hover:underline"
          >
            🚪 Sign Out
          </button>
        </form>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
