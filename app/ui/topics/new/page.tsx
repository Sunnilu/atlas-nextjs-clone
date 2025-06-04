'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTopicPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    // Simulate saving the topic
    console.log('New topic:', { title, description });
    setSubmitted(true);

    setTimeout(() => {
      router.push('/ui');
    }, 1000); // Redirect after a short delay
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Create a New Topic</h2>
      <input
        type="text"
        placeholder="Topic title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create
      </button>
      {submitted && <p className="text-green-600">✅ Topic created! Redirecting...</p>}
    </form>
  );
}

