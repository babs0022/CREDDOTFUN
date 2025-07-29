"use server";

import { analyzeXActivity, AnalyzeXActivityInput, AnalyzeXActivityOutput } from "@/ai/flows/analyze-x-activity";
import { z } from "zod";

const actionSchema = z.object({
    xActivity: z.string(),
    tippingRules: z.string(),
});

export async function handleTipAction(input: AnalyzeXActivityInput): Promise<AnalyzeXActivityOutput> {
    const parsedInput = actionSchema.safeParse(input);

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
