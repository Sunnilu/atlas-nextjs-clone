// app/components/AnswerForm.tsx
'use client';

import { useState } from 'react';
import { submitAnswer } from '@/lib/actions';

interface AnswerFormProps {
  questionId: string;
}

export default function AnswerForm({ questionId }: AnswerFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Answer text is required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('questionId', questionId);
      await submitAnswer(formData);
      setText('');
    } catch (err) {
      setError('Failed to submit answer');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border p-2 text-black"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your answer..."
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Answer
      </button>
    </form>
  );
}
