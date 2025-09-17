
'use server';

import { z } from 'zod';
import { convertTextToSpeech } from '@/ai/flows/text-to-speech';

const audioSchema = z.object({
  text: z.string().min(1, { message: 'Text for audio is missing.' }),
});

type AudioFormState = {
  audioDataUri?: string;
  error?: string;
};

export async function getAudioForMonasteryDetails(prevState: AudioFormState, formData: FormData): Promise<AudioFormState> {
  const validatedFields = audioSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.text?.[0] || 'Invalid text.',
    };
  }

  try {
    const result = await convertTextToSpeech({ text: validatedFields.data.text });
    return { audioDataUri: result.audioDataUri };
  } catch (error) {
    console.error('Error getting audio summary:', error);
    return { error: 'Failed to generate audio. The TTS model may be temporarily unavailable.' };
  }
}
