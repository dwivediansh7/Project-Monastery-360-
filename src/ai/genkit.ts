import {configureGenkit} from '@genkit-ai/core';
import {googleAI} from '@genkit-ai/googleai';

export const ai = configureGenkit({
  plugins: [googleAI({apiKey: process.env.GOOGLE_GENAI_API_KEY})],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const model = 'googleai/gemini-1.5-flash-latest';
