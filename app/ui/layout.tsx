// app/ui/layout.tsx
import { fetchTopics } from '@/lib/data';
import Link from 'next/link';

export default async function UILayout({ children }: { children: React.ReactNode }) {
  const topics = await fetchTopics();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#00003C] text-white p-4 border-r border-black">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link
                href={`/ui/topics/${topic.id}`}
                className="hover:underline block"
              >
                {topic.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/ui/topics/new" className="text-green-300 hover:underline">
              ➕ New Topic
            </Link>
          </li>
        </ul>

        <form action="/api/logout" method="POST" className="mt-6">
          <button
            type="submit"
            className="text-red-300 text-sm hover:underline"
          >
            🚪 Sign Out
          </button>
        </form>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
