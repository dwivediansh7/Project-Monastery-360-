'use server';

/**
 * @fileOverview Provides travel advice for visiting a monastery.
 *
 * - getTravelAdvice - A function that returns weather info and best time to visit.
 * - TravelAdviceInput - The input type for the getTravelAdvice function.
 * - TravelAdviceOutput - The return type for the getTravelAdvice function.
 */

import {generate} from '@genkit-ai/ai';
import {model} from '@/ai/genkit';
import * as z from 'zod';

const TravelAdviceInputSchema = z.object({
  monasteryName: z.string().describe('The name of the monastery.'),
  location: z.string().describe('The location (e.g., city, state) of the monastery.'),
});
export type TravelAdviceInput = z.infer<typeof TravelAdviceInputSchema>;

const TravelAdviceOutputSchema = z.object({
  weather: z.string().describe('A brief description of the typical weather at the location.'),
  bestTimeToVisit: z
    .string()
    .describe('A recommendation for the best months or season to visit, with reasoning.'),
});
export type TravelAdviceOutput = z.infer<typeof TravelAdviceOutputSchema>;

export async function getTravelAdvice(
  input: TravelAdviceInput
): Promise<TravelAdviceOutput> {
  const { monasteryName, location } = input;
  
  try {
    // Use Google AI for intelligent travel advice
    const systemPrompt = `You are a travel expert specializing in Sikkim tourism and monastery visits.
    Provide specific travel advice for visiting the monastery location mentioned.
    
    Please provide:
    1. Weather description (1-2 sentences about typical climate)
    2. Best time to visit with reasoning (1-2 sentences)
    
    Focus on practical advice for monastery visitors including seasonal considerations, weather patterns, and optimal viewing conditions.`;

    const response = await generate({
      model: model,
      prompt: `${systemPrompt}\n\nMonastery: ${monasteryName}\nLocation: ${location}`,
      config: {
        temperature: 0.4,
        maxOutputTokens: 300,
      }
    });

    const aiResponse = response.text();
    
    // Parse the AI response to extract weather and timing info
    let weather = "Sikkim has a temperate climate with mild summers and cool winters.";
    let bestTimeToVisit = "The best time to visit is from March to May and September to November.";

    if (aiResponse) {
      const lines = aiResponse.split('\n').filter(line => line.trim());
      
      // Simple parsing - look for weather and timing information
      const weatherLine = lines.find(line => 
        line.toLowerCase().includes('weather') || 
        line.toLowerCase().includes('climate') || 
        line.toLowerCase().includes('temperature')
      );
      
      const timingLine = lines.find(line => 
        line.toLowerCase().includes('best time') || 
        line.toLowerCase().includes('visit') || 
        line.toLowerCase().includes('month')
      );

      if (weatherLine) weather = weatherLine.replace(/^[^a-zA-Z]*/, '');
      if (timingLine) bestTimeToVisit = timingLine.replace(/^[^a-zA-Z]*/, '');
    }

    return {
      weather,
      bestTimeToVisit
    };
  } catch (error) {
    console.error('Travel advice AI error:', error);
    
    // Fallback logic
    let weather = "Sikkim has a temperate climate with mild summers and cool winters. ";
    let bestTimeToVisit = "The best time to visit is from March to May and September to November. ";
    
    if (location.toLowerCase().includes('gangtok')) {
      weather += "Gangtok enjoys pleasant weather year-round with occasional rainfall during monsoons.";
      bestTimeToVisit += "Avoid monsoon season (June-September) for clearer mountain views.";
    } else if (location.toLowerCase().includes('pelling')) {
      weather += "Pelling has cooler temperatures and excellent mountain views on clear days.";
      bestTimeToVisit += "October-December offers the clearest views of Kanchenjunga.";
    } else {
      weather += "The region experiences seasonal variations with monsoons from June to September.";
      bestTimeToVisit += "Spring and autumn offer the most comfortable weather for monastery visits.";
    }
    
    return {
      weather,
      bestTimeToVisit
    };
  }
}
