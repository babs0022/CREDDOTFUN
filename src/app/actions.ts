"use server";

import { analyzeXActivity, AnalyzeXActivityInput, AnalyzeXActivityOutput } from "@/ai/flows/analyze-x-activity";
import { getXLikes } from "@/ai/flows/get-x-likes";
import { GetXLikesInput, GetXLikesInputSchema, GetXLikesOutput } from "@/lib/types";
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

export type { Like, GetXLikesInput, GetXLikesOutput } from "@/lib/types";
