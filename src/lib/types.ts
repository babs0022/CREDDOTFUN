import { z } from 'zod';

export const LikeSchema = z.object({
    xUserId: z.string(),
    xUsername: z.string(),
    post: z.string(),
    avatar: z.string(),
});
export type Like = z.infer<typeof LikeSchema>;

export const GetXLikesInputSchema = z.object({
  xId: z.string().describe("The user's X (Twitter) ID."),
});
export type GetXLikesInput = z.infer<typeof GetXLikesInputSchema>;

export const GetXLikesOutputSchema = z.object({
  likes: z.array(LikeSchema),
});
export type GetXLikesOutput = z.infer<typeof GetXLikesOutputSchema>;
