// app/ui/topics/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Question {
  id: string;
  title: string;
  votes: number;
}

export default function TopicDetailPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState<{ title: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/topics/${id}`);
      const data = await res.json();
      setTopic(data.topic);
      setQuestions(data.questions);
    };

    fetchData();
  }, [id]);

  const handleVote = async (questionId: string) => {
    await fetch(`/api/questions/${questionId}/vote`, { method: 'POST' });
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, votes: q.votes + 1 } : q
      )
    );
  };

  if (!topic) return <p>Loading topic...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <strong>{q.title}</strong>
                <div className="text-sm text-gray-500">Votes: {q.votes}</div>
              </div>
              <button
                onClick={() => handleVote(q.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                👍
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
