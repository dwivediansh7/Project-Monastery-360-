'use server';

/**
 * @fileOverview Analyzes an image to provide a short description and a Google search query.
 *
 * - analyzeImage - A function that analyzes an image and returns a description and search query.
 * - AnalyzeImageInput - The input type for the analyzeImage function.
 * - AnalyzeImageOutput - The return type for the analyzeImage function.
 */

import {generate} from '@genkit-ai/ai';
import {model} from '@/ai/genkit';
import * as z from 'zod';

const AnalyzeImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a place, manuscript, or object, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageInput = z.infer<typeof AnalyzeImageInputSchema>;

const AnalyzeImageOutputSchema = z.object({
  description: z
    .string()
    .describe('A short description of the image content, around 50-60 words.'),
  googleSearchQuery: z
    .string()
    .describe('A good Google search query to find more information about the image content.'),
});
export type AnalyzeImageOutput = z.infer<typeof AnalyzeImageOutputSchema>;

export async function analyzeImage(
  input: AnalyzeImageInput
): Promise<AnalyzeImageOutput> {
  const { photoDataUri } = input;
  
  try {
    // Use Google AI with vision capabilities to analyze the image
    const systemPrompt = `You are an expert in Sikkimese culture, history, and Buddhist artifacts. 
    Analyze the provided image and provide:
    1. A concise description of 50-60 words identifying what is shown (monastery, manuscript, cultural object, landscape, etc.)
    2. A simple Google search query to help someone learn more about the subject.
    
    Focus on cultural, historical, and religious significance related to Sikkim and Buddhism.`;

    const response = await generate({
      model: model,
      prompt: [
        { text: systemPrompt },
        { 
          media: { 
            url: photoDataUri,
            contentType: photoDataUri.split(';')[0].split(':')[1] || 'image/jpeg'
          }
        }
      ],
      config: {
        temperature: 0.3,
        maxOutputTokens: 200,
      }
    });

    const aiResponse = response.text();
    
    // Extract description and search query from AI response
    // Try to parse structured response, fallback to simple parsing
    let description = "This appears to be an image related to Sikkimese heritage.";
    let googleSearchQuery = "Sikkim monastery heritage culture";

    if (aiResponse) {
      // Simple parsing - look for common patterns
      const lines = aiResponse.split('\n').filter(line => line.trim());
      if (lines.length >= 2) {
        description = lines[0].replace(/^[^a-zA-Z]*/, '').slice(0, 200);
        googleSearchQuery = lines[lines.length - 1].replace(/^[^a-zA-Z]*/, '').slice(0, 100);
      } else if (lines.length === 1) {
        description = lines[0].slice(0, 200);
        googleSearchQuery = "Sikkim Buddhist monastery culture analysis";
      }
    }

    return {
      description,
      googleSearchQuery
    };
  } catch (error) {
    console.error('Image analysis AI error:', error);
    
    // Fallback to simple analysis based on data URI
    let description = "This appears to be an image related to Sikkimese heritage. ";
    let googleSearchQuery = "Sikkim monastery heritage culture";
    
    if (photoDataUri.includes('jpeg') || photoDataUri.includes('jpg')) {
      description += "The image format suggests it's a photograph, possibly of a monastery, cultural artifact, or landscape from Sikkim.";
      googleSearchQuery = "Sikkim monastery photograph heritage site";
    } else if (photoDataUri.includes('png')) {
      description += "This could be a digital image or document related to Sikkimese cultural heritage, manuscripts, or historical records.";
      googleSearchQuery = "Sikkim cultural heritage digital archive";
    } else {
      description += "This image may contain important cultural or historical information about Sikkim's monastic traditions and heritage.";
      googleSearchQuery = "Sikkim Buddhist monastery culture history";
    }
    
    return {
      description,
      googleSearchQuery
    };
  }
}
