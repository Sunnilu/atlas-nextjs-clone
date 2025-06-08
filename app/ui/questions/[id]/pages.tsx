// app/ui/questions/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, CheckCircle } from 'lucide-react';
import { getQuestionWithAnswers } from '@/lib/data';
import AnswerForm from '@/components/AnswerForm';
import AcceptAnswerButton from '@/components/AcceptAnswerButton';
// import AcceptAnswerButton from '@/components/AcceptAnswerButton';
// Update the import path below if AcceptAnswerButton exists elsewhere:
// import AcceptAnswerButton from '../../../../../components/AcceptAnswerButton';

interface Props {
  params: { id: string };
}

export default async function QuestionPage({ params }: Props) {
  const questionId = Number(params.id);
  const question = await getQuestionWithAnswers(params.id);

  if (!question) return notFound();

  const accepted = question.answers.find((a) => a.accepted);
  const others = question.answers.filter((a) => !a.accepted);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">#{question.title}</h1>

      <AnswerForm questionId={questionId} />

      <div className="mt-8 space-y-4">
        {accepted && (
          <div className="p-4 border rounded border-green-500 bg-green-50 flex justify-between items-center">
            <p>{accepted.text}</p>
            <CheckCircle className="text-green-600" />
          </div>
        )}

        {others.map((a) => (
          <div key={a.id} className="p-4 border rounded flex justify-between items-center">
            <p>{a.text}</p>
            <AcceptAnswerButton answerId={Number(a.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
