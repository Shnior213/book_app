import z from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type Formfileds = z.infer<typeof formSchema>;
