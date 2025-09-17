
'use server';

import { z } from 'zod';
import { summarizeArchiveMaterial } from '@/ai/flows/archive-material-summarization';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech';

// Summarizer action
const summarySchema = z.object({
  documentContent: z.string().min(1, { message: 'Document content is missing.' }),
});

type SummaryFormState = {
  summary?: string;
  error?: string;
};

export async function getSummary(prevState: SummaryFormState, formData: FormData): Promise<SummaryFormState> {
  const validatedFields = summarySchema.safeParse({
    documentContent: formData.get('documentContent'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.documentContent?.[0] || 'Invalid document content.',
    };
  }

  try {
    const result = await summarizeArchiveMaterial({ archiveMaterial: validatedFields.data.documentContent });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error getting summary:', error);
    return { error: 'Failed to generate summary. The AI model may be temporarily unavailable.' };
  }
}

// Text-to-speech action
const audioSchema = z.object({
  summary: z.string().min(1, { message: 'Summary text is missing.' }),
});

type AudioFormState = {
  audioDataUri?: string;
  error?: string;
};

export async function getAudioSummary(prevState: AudioFormState, formData: FormData): Promise<AudioFormState> {
  const validatedFields = audioSchema.safeParse({
    summary: formData.get('summary'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.summary?.[0] || 'Invalid summary text.',
    };
  }

  try {
    const result = await convertTextToSpeech({ text: validatedFields.data.summary });
    return { audioDataUri: result.audioDataUri };
  } catch (error) {
    console.error('Error getting audio summary:', error);
    return { error: 'Failed to generate audio. The TTS model may be temporarily unavailable.' };
  }
}
