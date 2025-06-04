// app/ui/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

const mockTopics = [
  { id: '1', title: 'Next.js' },
  { id: '2', title: 'React' },
  { id: '3', title: 'PostgreSQL' },
];

export default function UILayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          {mockTopics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/ui/topics/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 mt-4">
          <li><Link href="/ui">Dashboard</Link></li>
          <li><Link href="/ui/topics/new">New Topic</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
