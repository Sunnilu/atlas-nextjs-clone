import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Topic, Question } from '@prisma/client';

export default async function TopicDetails({ params }: { params: { id: string } }) {
  let topic: Topic | null = null;
  let questions: Question[] = [];

  try {
    topic = await prisma.topic.findUnique({ where: { id: params.id } });

    if (!topic) return notFound();

    questions = await prisma.question.findMany({
      where: { topicId: params.id },
      orderBy: { votes: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching topic/questions:', error);
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="border p-2 rounded">
              <strong>{q.title}</strong>
              <span className="ml-2 text-sm text-gray-500">(Votes: {q.votes})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
