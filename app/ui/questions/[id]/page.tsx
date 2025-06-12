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

  if (!question) {
    return (
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold">❌ Question not found</h2>
      </div>
    );
  }

  const accepted = answers.find((a) => a.accepted);
  const others = answers.filter((a) => !a.accepted);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{question.title}</h1>

      {/* Form to submit new answers */}
      <AnswerForm questionId={question.id} />

      {/* List of answers */}
      <div className="mt-8 space-y-4">
        {accepted && (
          <div className="bg-[#00003C] border border-black p-5 text-white rounded flex justify-between items-center">
            <p>{accepted.text}</p>
            <CheckCircle className="text-green-400 w-6 h-6" />
          </div>
        )}

        {others.map((a) => (
          <div
            key={a.id}
            className="bg-[#00003C] border border-black p-5 text-white rounded flex justify-between items-center"
          >
            <p>{a.text}</p>
            <AcceptAnswerButton answerId={a.id} questionId={question.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
