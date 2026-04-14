import z from "zod";

export const reviewSchema = z.object({
  content: z.string(),
  rating: z.number(),
  userId: z.number(),
  bookId: z.number(),
});

export const updateReviewSchema = reviewSchema.partial().extend({
  id: z.number(),
});

export type CreateReviewDetails = z.infer<typeof reviewSchema>;
export type UpdateReviewDetails = z.infer<typeof updateReviewSchema>;
