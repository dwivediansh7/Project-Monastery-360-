'use server';

/**
 * @fileOverview Summarizes archive materials using AI.
 *
 * - summarizeArchiveMaterial - A function that summarizes the archive material.
 * - SummarizeArchiveMaterialInput - The input type for the summarizeArchiveMaterial function.
 * - SummarizeArchiveMaterialOutput - The return type for the summarizeArchiveMaterial function.
 */

import {generate} from '@genkit-ai/ai';
import {model} from '@/ai/genkit';
import * as z from 'zod';

const SummarizeArchiveMaterialInputSchema = z.object({
  archiveMaterial: z
    .string()
    .describe('The archive material to summarize. This could be text from a scanned document or manuscript.'),
});
export type SummarizeArchiveMaterialInput = z.infer<
  typeof SummarizeArchiveMaterialInputSchema
>;

const SummarizeArchiveMaterialOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the archive material.'),
});
export type SummarizeArchiveMaterialOutput = z.infer<
  typeof SummarizeArchiveMaterialOutputSchema
>;

export async function summarizeArchiveMaterial(
  input: SummarizeArchiveMaterialInput
): Promise<SummarizeArchiveMaterialOutput> {
  const { archiveMaterial } = input;
  
  try {
    // Use Google AI to create intelligent summaries
    const systemPrompt = `You are an expert archivist specializing in Sikkim's cultural and religious heritage. 
    Please provide a concise summary of the following historical document or archive material.
    Focus on:
    - Key historical facts and dates
    - Cultural or religious significance
    - Important figures or events mentioned
    - Relevance to Sikkim's monastery and Buddhist traditions
    
    Keep the summary informative but concise (2-4 sentences).`;

    const response = await generate({
      model: model,
      prompt: `${systemPrompt}\n\nArchive Material:\n${archiveMaterial}`,
      config: {
        temperature: 0.3,
        maxOutputTokens: 300,
      }
    });

    const summary = response.text() || "This archive material provides historical documentation related to Sikkim's cultural heritage.";
    
    return { summary };
  } catch (error) {
    console.error('Archive summarization AI error:', error);
    
    // Fallback to simple analysis
    const text = archiveMaterial.toLowerCase();
    let summary = "This archive material ";
    
    if (text.includes('monastery') || text.includes('temple')) {
      summary += "contains information about religious institutions and monastic traditions in Sikkim.";
    } else if (text.includes('king') || text.includes('ruler') || text.includes('dynasty')) {
      summary += "discusses historical rulers and political developments in Sikkim's history.";
    } else if (text.includes('festival') || text.includes('ceremony') || text.includes('ritual')) {
      summary += "describes cultural ceremonies, festivals, and religious practices of the region.";
    } else if (text.includes('buddhist') || text.includes('tibet') || text.includes('dharma')) {
      summary += "focuses on Buddhist teachings, Tibetan influence, and spiritual practices in Sikkim.";
    } else {
      summary += "provides historical documentation related to Sikkim's cultural and religious heritage.";
    }
    
    const wordCount = archiveMaterial.split(/\s+/).length;
    if (wordCount > 500) {
      summary += ` This extensive document (${wordCount} words) contains detailed historical information.`;
    } else if (wordCount > 100) {
      summary += ` This document (${wordCount} words) provides moderate detail on the subject.`;
    } else {
      summary += ` This brief document (${wordCount} words) offers concise information.`;
    }
    
    return { summary };
  }
}
