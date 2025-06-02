export default function NewTopicPage() {
  return (
    <form className="space-y-4 p-4">
      <h2>Create a New Topic</h2>
      <input type="text" placeholder="Topic title" className="border p-2 w-full" />
      <textarea placeholder="Description" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}

