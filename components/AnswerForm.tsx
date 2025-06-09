'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router

interface AnswerFormProps {
  questionId: string;
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Hook usage

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, text }),
      });

      if (res.ok) {
        setText('');
        router.refresh(); // ✅ Smooth UI refresh
      } else {
        console.error('Failed to submit answer');
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Answer this question..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
