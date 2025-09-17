
'use server';

import { z } from 'zod';
import { analyzeImage } from '@/ai/flows/curious-cloud';

// Curious Cloud action
const imageSchema = z.object({
  photoDataUri: z.string().min(1, { message: 'Please upload an image.' }),
});

type AnalysisFormState = {
  description?: string;
  googleSearchQuery?: string;
  error?: string;
};

export async function getImageAnalysis(prevState: AnalysisFormState, formData: FormData): Promise<AnalysisFormState> {
  const validatedFields = imageSchema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.photoDataUri?.[0] || 'Invalid image.',
    };
  }

  try {
    const result = await analyzeImage({ photoDataUri: validatedFields.data.photoDataUri });
    return {
      description: result.description,
      googleSearchQuery: result.googleSearchQuery,
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return { error: 'Failed to analyze the image. The AI model may be temporarily unavailable.' };
  }
}
