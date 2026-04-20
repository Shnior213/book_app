import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  image: z
    .any()
    .transform((val) => {
      if (val instanceof FileList && val.length > 0) return val[0];
      return null;
    })
    .nullable()
    .optional(),
  categoryIds: z.array(z.coerce.number()).default([]),
});

export type FormInput = z.input<typeof bookSchema>;
export type FormOutput = z.output<typeof bookSchema>;
