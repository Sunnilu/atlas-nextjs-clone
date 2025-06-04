import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function TopicListPage() {
  let topics = [];

  try {
    topics = await prisma.topic.findMany();
  } catch {
    topics = [
      { id: '1', title: 'Next.js' },
      { id: '2', title: 'React' },
      { id: '3', title: 'PostgreSQL' },
    ];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Topics</h1>
      <ul className="space-y-4">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/ui/topics/${topic.id}`} className="block p-4 border rounded hover:bg-gray-50">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

