'use server';

import { z } from 'zod';
import { chat, ChatInput } from '@/ai/flows/chatbot';

const chatSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })),
  message: z.string().min(1, { message: 'Message cannot be empty.' }),
});

type ChatFormState = {
  response?: string;
  error?: string;
};

export async function sendMessage(prevState: ChatFormState, formData: FormData): Promise<ChatFormState> {
  let history: ChatInput['history'];
  try {
    history = JSON.parse(formData.get('history') as string || '[]');
  } catch (e) {
    return { error: 'Invalid chat history format.' };
  }
  
  const validatedFields = chatSchema.safeParse({
    history: history,
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await chat(validatedFields.data);
    return { response: result.message };
  } catch (error) {
    console.error('Error getting chat response:', error);
    return { error: 'Failed to get response. The AI model may be temporarily unavailable.' };
  }
}
