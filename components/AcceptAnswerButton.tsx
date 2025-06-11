import { acceptAnswer } from '@/lib/actions';

interface AcceptAnswerButtonProps {
  answerId: string;
  questionId: string;
}

export default function AcceptAnswerButton({
  answerId,
  questionId,
}: AcceptAnswerButtonProps) {
  return (
    <form action={acceptAnswer}>
      <input type="hidden" name="answerId" value={answerId} />
      <input type="hidden" name="questionId" value={questionId} />
      <button
        type="submit"
        title="Mark as accepted"
        className="text-gray-500 hover:text-green-600"
      >
        ✔
      </button>
    </form>
  );
}
