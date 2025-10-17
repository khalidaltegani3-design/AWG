'use server';
/**
 * @fileOverview A flow for generating a new background for an image using AI.
 *
 * - generateBackground - A function that handles the background generation process.
 * - GenerateBackgroundInput - The input type for the generateBackground function.
 * - GenerateBackgroundOutput - The return type for the generateBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateBackgroundInputSchema = z.object({
  prompt: z
    .string()
    .describe('A description of the desired background.'),
  imageDataUri: z
    .string()
    .describe(
      "A photo from the user's camera, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateBackgroundInput = z.infer<typeof GenerateBackgroundInputSchema>;

const GenerateBackgroundOutputSchema = z.object({
    imageDataUri: z.string().describe("The generated image with the new background, as a data URI."),
});
export type GenerateBackgroundOutput = z.infer<typeof GenerateBackgroundOutputSchema>;


export async function generateBackground(input: GenerateBackgroundInput): Promise<GenerateBackgroundOutput> {
  const result = await generateBackgroundFlow(input);
  return { imageDataUri: result.media!.url };
}

const generateBackgroundFlow = ai.defineFlow(
  {
    name: 'generateBackgroundFlow',
    inputSchema: GenerateBackgroundInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            { media: { url: input.imageDataUri } },
            { text: `You are an AI green screen. The user has provided an image. Your task is to replace the background of that image based on the user's prompt. Only replace the background, keeping the subject in the foreground intact.

User's prompt: "${input.prompt}"` },
        ],
        config: {
            responseModalities: ['IMAGE'],
        },
    });
    
    return { media };
  }
);
