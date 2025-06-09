import { notFound } from 'next/navigation';
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

  if (!question) return notFound();

  const accepted = answers.find((a) => a.accepted);
  const others = answers.filter((a) => !a.accepted);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="p-6 mb-6 rounded bg-[#00003C] border border-black text-white">
        <h1 className="text-2xl font-bold">#{question.title}</h1>
      </div>

      <AnswerForm questionId={question.id} />

      <div className="mt-8 space-y-4">
        {accepted && (
          <div className="p-4 border border-green-500 bg-green-50 rounded flex justify-between items-center">
            <p>{accepted.text}</p>
            <CheckCircle className="text-green-600" />
          </div>
        )}

        {others.map((answer) => (
          <div
            key={answer.id}
            className="p-4 border border-gray-300 rounded flex justify-between items-center"
          >
            <p>{answer.text}</p>
            <AcceptAnswerButton answerId={answer.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
