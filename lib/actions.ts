// lib/actions.ts
'use server';

import { insertTopic, insertAnswer, acceptAnswer as acceptAnswerQuery } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new topic.
 * Called from the /ui/topics/new form.
 */
export async function createTopic(formData: FormData) {
  const title = formData.get('title')?.toString().trim();

  if (!title) {
    throw new Error('Title is required');
  }

  const topic = await insertTopic({ title });
  revalidatePath('/ui');
  redirect(`/ui/topics/${topic.id}`);
}

/**
 * Server action to submit a new answer.
 * Called from the /ui/questions/[id] form.
 */
export async function submitAnswer(formData: FormData) {
  const text = formData.get('text')?.toString().trim();
  const questionId = formData.get('questionId')?.toString();

  if (!text || !questionId) {
    throw new Error('Text and questionId are required');
  }

  await insertAnswer({ question_id: questionId, text });
  revalidatePath(`/ui/questions/${questionId}`);
}

/**
 * Server action to mark an answer as accepted.
 * Updates the question to reference the accepted answer.
 */
export async function acceptAnswer(formData: FormData) {
  const answerId = formData.get('answerId')?.toString();
  const questionId = formData.get('questionId')?.toString();

  if (!answerId || !questionId) {
    throw new Error('Answer ID and Question ID are required');
  }

  await acceptAnswerQuery(questionId, answerId);
  revalidatePath(`/ui/questions/${questionId}`);
}
