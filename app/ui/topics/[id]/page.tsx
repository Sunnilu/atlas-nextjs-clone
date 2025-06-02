export default function TopicDetails({ params }: { params: { id: string } }) {
  return <h1>Showing Topic ID: {params.id}</h1>;
}
