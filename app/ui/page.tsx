interface TopicPageProps {
  params: { id: string };
}

export default async function TopicDetails({ params }: TopicPageProps) {
  return (
    <div>
      <h1>Topic ID: {params.id}</h1>
    </div>
  );
}
