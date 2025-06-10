// Define your server actions here
'use server';

import { insertTopic } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTopic(formData: FormData) {
  const title = formData.get('title')?.toString();

  if (!title || title.trim().length === 0) {
    throw new Error('Title is required');
  }

  const topic = await insertTopic({ title });
  revalidatePath('/ui');
  redirect(`/ui/topics/${topic.id}`);
}
