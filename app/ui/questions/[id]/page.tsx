// 3. app/ui/questions/[id]/page.tsx
import { fetchQuestionById, fetchAnswersForQuestion } from '@/lib/data';
import AnswerForm from '@/components/AnswerForm';
import AcceptAnswerButton from '@/components/AcceptAnswerButton';
import { CheckCircle } from 'lucide-react';

interface Props {
  params: { id: string };
}

export default async function QuestionPage({ params }: Props) {
  const question = await fetchQuestionById(params.id);
  const answers = await fetchAnswersForQuestion(params.id);

  if (!question) return <div className="text-white p-6">Question not found</div>;

  const accepted = answers.find((a) => a.accepted);
  const others = answers.filter((a) => !a.accepted);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{question.title}</h1>
      <AnswerForm questionId={question.id} />

      <div className="mt-8 space-y-4">
        {accepted && (
          <div className="bg-[#00003C] border border-black p-5 text-white rounded flex justify-between items-center">
            <p>{accepted.text}</p>
            <CheckCircle className="text-green-400" />
          </div>
        )}

        {others.map((a) => (
          <div
            key={a.id}
            className="bg-[#00003C] border border-black p-5 text-white rounded flex justify-between items-center"
          >
            <p>{a.text}</p>
            <AcceptAnswerButton answerId={a.id} />
          </div>
        ))}
      </div>
    </div>
  );
}