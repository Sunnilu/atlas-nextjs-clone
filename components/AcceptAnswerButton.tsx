'use client';

import { Check } from 'lucide-react';

interface AcceptAnswerButtonProps {
  answerId: string;
}

export default function AcceptAnswerButton({ answerId }: AcceptAnswerButtonProps) {
  const handleAccept = async () => {
    try {
      const res = await fetch(`/api/answers/${answerId}/accept`, {
        method: 'PATCH',
      });

      if (res.ok) {
        window.location.reload(); // Refresh to reflect accepted answer
      } else {
        console.error('Failed to accept answer');
      }
    } catch (err) {
      console.error('Error accepting answer:', err);
    }
  };

  return (
    <button
      onClick={handleAccept}
      title="Mark as accepted"
      className="text-gray-500 hover:text-green-600"
    >
      <Check />
    </button>
  );
}
