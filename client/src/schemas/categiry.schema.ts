import z from "zod";

export const categirySchema = z.object({
  name: z.string(),
});

export type CategiryFormfileds = z.infer<typeof categirySchema>;
