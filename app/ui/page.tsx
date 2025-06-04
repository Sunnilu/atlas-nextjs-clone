// app/ui/page.tsx
const mockTopics = [
  { id: '1', title: 'Next.js' },
  { id: '2', title: 'React' },
  { id: '3', title: 'PostgreSQL' },
];

export default function UIPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {mockTopics.map((topic) => (
          <li key={topic.id}>
            <a href={`/ui/topics/${topic.id}`} className="text-blue-600 hover:underline">
              {topic.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


