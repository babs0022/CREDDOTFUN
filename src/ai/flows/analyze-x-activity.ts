'use server';

/**
 * @fileOverview Analyzes X activity to trigger micro-payments based on predefined rules.
 *
 * - analyzeXActivity - A function that analyzes X activity and triggers micro-payments.
 * - AnalyzeXActivityInput - The input type for the analyzeXActivity function.
 * - AnalyzeXActivityOutput - The return type for the analyzeXActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeXActivityInputSchema = z.object({
  xActivity: z.string().describe('The X activity to analyze (e.g., a like).'),
  tippingRules: z.string().describe('The user-defined tipping rules.'),
});
export type AnalyzeXActivityInput = z.infer<typeof AnalyzeXActivityInputSchema>;

const AnalyzeXActivityOutputSchema = z.object({
  shouldTip: z.boolean().describe('Whether a tip should be triggered based on the activity and rules.'),
  tipAmount: z.number().optional().describe('The amount to tip, if applicable.'),
  reason: z.string().describe('The reason for the decision.'),
});
export type AnalyzeXActivityOutput = z.infer<typeof AnalyzeXActivityOutputSchema>;

export async function analyzeXActivity(input: AnalyzeXActivityInput): Promise<AnalyzeXActivityOutput> {
  return analyzeXActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeXActivityPrompt',
  input: {schema: AnalyzeXActivityInputSchema},
  output: {schema: AnalyzeXActivityOutputSchema},
  prompt: `You are an AI assistant that analyzes X activity and determines whether to trigger a micro-payment based on user-defined rules.\n\nActivity: {{{xActivity}}}\nRules: {{{tippingRules}}}\n\nDetermine if the activity matches the rules. If it does, set shouldTip to true and provide the tipAmount. If not, set shouldTip to false.\nExplain your reasoning in the reason field.\n\nOutput should be in JSON format.`,
});

const analyzeXActivityFlow = ai.defineFlow(
  {
    name: 'analyzeXActivityFlow',
    inputSchema: AnalyzeXActivityInputSchema,
    outputSchema: AnalyzeXActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
