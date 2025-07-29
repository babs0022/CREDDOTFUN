'use server';
/**
 * @fileOverview A flow for fetching a user's recent liked tweets from X.
 *
 * - getXLikes - Fetches recent likes for a given X user ID.
 */

import {ai} from '@/ai/genkit';
import { GetXLikesInput, GetXLikesInputSchema, GetXLikesOutput, GetXLikesOutputSchema } from "@/app/actions";

export async function getXLikes(input: GetXLikesInput): Promise<GetXLikesOutput> {
  return getXLikesFlow(input);
}

const getXLikesFlow = ai.defineFlow(
  {
    name: 'getXLikesFlow',
    inputSchema: GetXLikesInputSchema,
    outputSchema: GetXLikesOutputSchema,
  },
  async (input) => {
    // In a real-world scenario, you would make a call to the X API here
    // using the user's access token stored securely.
    // For now, we will return mock data.
    console.log(`Fetching likes for X ID: ${input.xId}`);
    
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      likes: [
        {
            xUserId: '12345',
            xUsername: '@testuser1',
            post: 'Just discovered this amazing tipping app called CRED! So cool.',
            avatar: 'https://placehold.co/40x40.png',
        },
        {
            xUserId: '67890',
            xUsername: '@creator2',
            post: 'Excited to share my latest artwork with the world!',
            avatar: 'https://placehold.co/40x40.png',
        },
        {
            xUserId: '11223',
            xUsername: '@degen_dev',
            post: 'On-chain micro-payments are the future. #web3',
            avatar: 'https://placehold.co/40x40.png',
        }
      ],
    };
  }
);
