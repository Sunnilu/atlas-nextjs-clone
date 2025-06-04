// app/ui/layout.tsx
import Link from "next/link";
import { db } from "@vercel/postgres";

export default async function UILayout({ children }: { children: React.ReactNode }) {
  const client = await db.connect();
  const topics = await client.sql`SELECT id, title FROM topics ORDER BY title`;

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <ul className="space-y-2">
          <li><Link href="/ui">Dashboard</Link></li>
          <li><Link href="/ui/topics/new">New Topic</Link></li>
          {topics.rows.map((topic) => (
            <li key={topic.id}>
              <Link className="text-blue-600 hover:underline" href={`/ui/topics/${topic.id}`}>
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
