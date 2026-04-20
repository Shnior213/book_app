import z from "zod";
import { updateReviewSchema } from "./review.schema";
import { updateCategorySchema } from "./category.schema";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  userId: z.number(),
  reviews: z.array(updateReviewSchema).default([]),
  categoryIds: z.array(z.number()).optional(),
  image: z.string().optional(),
});

export const updateBookSchema = bookSchema.partial().extend({
  id: z.number(),
});

export type CreateBookDetails = z.infer<typeof bookSchema>;
export type UpdateBookDetails = z.infer<typeof updateBookSchema>;
