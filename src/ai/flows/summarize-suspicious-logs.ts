'use server';

/**
 * @fileOverview Summarizes suspicious logs using generative AI.
 *
 * - summarizeSuspiciousLogs - A function that summarizes suspicious logs.
 * - SummarizeSuspiciousLogsInput - The input type for the summarizeSuspiciousLogs function.
 * - SummarizeSuspiciousLogsOutput - The return type for the summarizeSuspiciousLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSuspiciousLogsInputSchema = z.object({
  logs: z.string().describe('The security logs to summarize.'),
});
export type SummarizeSuspiciousLogsInput = z.infer<typeof SummarizeSuspiciousLogsInputSchema>;

const SummarizeSuspiciousLogsOutputSchema = z.object({
  summary: z.string().describe('A summary of the suspicious logs.'),
});
export type SummarizeSuspiciousLogsOutput = z.infer<typeof SummarizeSuspiciousLogsOutputSchema>;

export async function summarizeSuspiciousLogs(input: SummarizeSuspiciousLogsInput): Promise<SummarizeSuspiciousLogsOutput> {
  return summarizeSuspiciousLogsFlow(input);
}

const summarizeSuspiciousLogsPrompt = ai.definePrompt({
  name: 'summarizeSuspiciousLogsPrompt',
  input: {schema: SummarizeSuspiciousLogsInputSchema},
  output: {schema: SummarizeSuspiciousLogsOutputSchema},
  prompt: `You are a cybersecurity expert. Please summarize the following security logs, highlighting any potential threats or suspicious activities:\n\nLogs: {{{logs}}}`,
});

const summarizeSuspiciousLogsFlow = ai.defineFlow(
  {
    name: 'summarizeSuspiciousLogsFlow',
    inputSchema: SummarizeSuspiciousLogsInputSchema,
    outputSchema: SummarizeSuspiciousLogsOutputSchema,
  },
  async input => {
    const {output} = await summarizeSuspiciousLogsPrompt(input);
    return output!;
  }
);
