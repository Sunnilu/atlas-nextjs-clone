import Link from 'next/link';

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li><Link href="/ui">Dashboard</Link></li>
          <li><Link href="/ui/topics/new">New Topic</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
