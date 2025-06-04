// app/ui/topics/[id]/page.tsx
type Props = {
  params: { id: string };
};

const mockQuestions = [
  { id: 'q1', title: 'What is RSC?', votes: 5 },
  { id: 'q2', title: 'How to use Prisma?', votes: 3 },
];

export default function TopicPage({ params }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Topic ID: {params.id}</h1>
      <ul className="space-y-2">
        {mockQuestions.map((q) => (
          <li key={q.id} className="border p-2 rounded">
            <strong>{q.title}</strong>
            <span className="text-sm text-gray-500"> (Votes: {q.votes})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
