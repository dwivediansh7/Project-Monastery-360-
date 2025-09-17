'use server';

/**
 * @fileOverview A simple chatbot flow using Genkit.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai, model} from '@/ai/genkit';
import {generate} from '@genkit-ai/ai';
import {z} from 'zod';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).describe('The chat history.'),
  message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The chatbot\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// Enhanced chat implementation using Google AI
export async function chat(input: ChatInput): Promise<ChatOutput> {
  const { history, message } = input;
  
  try {
    // Create a system prompt for monastery-focused responses
    const systemPrompt = `You are a knowledgeable guide specializing in Sikkim's monasteries and Buddhist culture. 
    You provide helpful, accurate information about:
    - Monastery history, architecture, and significance
    - Buddhist festivals and ceremonies  
    - Cultural practices and traditions
    - Travel advice for visiting monasteries
    - Spiritual and philosophical aspects of Buddhism in Sikkim
    
    Keep responses informative but conversational, around 2-3 sentences unless more detail is specifically requested.`;

    // Use Google AI to generate a response
    const response = await generate({
      model: model,
      prompt: `${systemPrompt}\n\nUser: ${message}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return { 
      message: response.text() || "I'd be happy to help you learn about Sikkim's monasteries. Could you ask me something specific?" 
    };
  } catch (error) {
    console.error('Chatbot AI error:', error);
    
    // Fallback to simple responses if AI fails
    let response = "I'm here to help you learn about monasteries in Sikkim. ";
    
    if (message.toLowerCase().includes('monastery')) {
      response += "Sikkim has many beautiful monasteries including Rumtek, Pemayangtse, and Enchey Monastery.";
    } else if (message.toLowerCase().includes('festival')) {
      response += "The monasteries host many festivals throughout the year, including Losar, Bumchu, and various masked dance festivals.";
    } else if (message.toLowerCase().includes('history')) {
      response += "These monasteries have rich histories dating back centuries, preserving Tibetan Buddhist culture and traditions.";
    } else {
      response += "Could you tell me more about what specific aspect of Sikkim's monasteries you'd like to know about?";
    }
    
    return { message: response };
  }
}
