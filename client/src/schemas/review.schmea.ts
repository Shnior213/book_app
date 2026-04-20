import z from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(0).max(5),
  content: z.string(),
});

export type ReviewFormfileds = z.infer<typeof reviewSchema>;
