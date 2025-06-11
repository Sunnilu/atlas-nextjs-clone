// app/components/AnswerForm.tsx
'use client';

import { useState } from 'react';
import { submitAnswer } from '@/lib/actions';

interface Props {
  questionId: string;
}

export default function AnswerForm({ questionId }: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Answer text is required');
      return;
    }

    try {
      await submitAnswer({ text, questionId });
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

// app/components/AcceptAnswerButton.tsx
'use client';

import { acceptAnswer } from '@/lib/actions';

interface Props {
  answerId: string;
}

export default function AcceptAnswerButton({ answerId }: Props) {
  async function handleAccept() {
    await acceptAnswer(answerId);
  }

  return (
    <form action={handleAccept}>
      <button type="submit" className="text-green-400 hover:underline">
        ✔ Accept
      </button>
    </form>
  );
}

// lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { insertAnswer, acceptAnswer as acceptAnswerQuery } from './data';

export async function submitAnswer({ text, questionId }: { text: string; questionId: string }) {
  await insertAnswer({ text, question_id: questionId });
  revalidatePath(`/ui/questions/${questionId}`);
}

export async function acceptAnswer(answerId: string) {
  await acceptAnswerQuery(answerId);
  revalidatePath(`/ui/questions`); // Revalidates all question pages
}

// lib/data.ts — ensure this is added:
export async function insertAnswer(
  answer: Pick<Answer, 'text' | 'question_id'>
): Promise<Answer> {
  try {
    const data = await sql<Answer>`
      INSERT INTO answers (text, question_id)
      VALUES (${answer.text}, ${answer.question_id})
      RETURNING *;
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to insert answer.');
  }
}
