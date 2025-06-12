import { createTopic } from '@/lib/actions';

export default function NewTopicPage() {
  return (
    <form action={createTopic} className="space-y-4 p-4 max-w-md">
      <h2 className="text-2xl font-bold">Create a New Topic</h2>
      <input
        type="text"
        name="title"
        placeholder="Topic title"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
