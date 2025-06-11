// app/components/AcceptAnswerButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { acceptAnswer } from '@/lib/actions';

interface AcceptAnswerButtonProps {
  answerId: string;
  questionId: string;
}

function SubmitIcon() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      title="Mark as accepted"
      className="text-gray-500 hover:text-green-600 disabled:opacity-50"
      disabled={pending}
    >
      ✔
    </button>
  );
}

export default function AcceptAnswerButton({
  answerId,
  questionId,
}: AcceptAnswerButtonProps) {
  const handleAccept = async (formData: FormData) => {
    formData.set('answerId', answerId);
    formData.set('questionId', questionId);
    await acceptAnswer(formData);
  };

  return (
    <form action={handleAccept}>
      <SubmitIcon />
    </form>
  );
}
