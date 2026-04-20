import z from "zod";

export const categorySchema = z.object({
  name: z.string(),
});

export const updateCategorySchema = categorySchema.partial().extend({
  id: z.number(),
  bookId: z.number(),
});

export type CreateCategoryDetails = z.infer<typeof categorySchema>;
export type UpdateCategoryDetails = z.infer<typeof updateCategorySchema>;
