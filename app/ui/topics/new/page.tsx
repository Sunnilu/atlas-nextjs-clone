'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTopicPage() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const res = await fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    } else {
      router.push('/ui'); // Go back to the topics list
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md">
      <h2 className="text-2xl font-bold">Create a New Topic</h2>
      <input
        type="text"
        placeholder="Topic title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
