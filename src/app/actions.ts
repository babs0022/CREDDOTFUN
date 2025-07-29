"use server";

import { analyzeXActivity, AnalyzeXActivityInput, AnalyzeXActivityOutput } from "@/ai/flows/analyze-x-activity";
import { getXLikes } from "@/ai/flows/get-x-likes";
import { z } from "zod";

const tipActionSchema = z.object({
    xActivity: z.string(),
    tippingRules: z.string(),
});

export async function handleTipAction(input: AnalyzeXActivityInput): Promise<AnalyzeXActivityOutput> {
    const parsedInput = tipActionSchema.safeParse(input);

    if (!parsedInput.success) {
        return {
            shouldTip: false,
            reason: "Invalid input provided.",
        };
    }

    try {
        const result = await analyzeXActivity(parsedInput.data);
        // In a real app, you would trigger the smart contract transaction here if result.shouldTip is true.
        return result;
    } catch (error) {
        console.error("Error in GenAI flow:", error);
        return {
            shouldTip: false,
            reason: "An error occurred while analyzing the activity.",
        };
    }
}


export const GetXLikesInputSchema = z.object({
  xId: z.string().describe("The user's X (Twitter) ID."),
});
export type GetXLikesInput = z.infer<typeof GetXLikesInputSchema>;


export const LikeSchema = z.object({
    xUserId: z.string(),
    xUsername: z.string(),
    post: z.string(),
    avatar: z.string(),
});
export type Like = z.infer<typeof LikeSchema>;

export const GetXLikesOutputSchema = z.object({
  likes: z.array(LikeSchema),
});
export type GetXLikesOutput = z.infer<typeof GetXLikesOutputSchema>;


export async function handleGetLikesAction(input: GetXLikesInput): Promise<GetXLikesOutput> {
    const parsedInput = GetXLikesInputSchema.safeParse(input);

    if (!parsedInput.success) {
        return {
            likes: [],
        };
    }
    
    try {
        return await getXLikes(parsedInput.data);
    } catch (error) {
        console.error("Error fetching X likes:", error);
        return {
            likes: [],
        };
    }
}
