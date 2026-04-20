import z from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const updateUserSchema = userSchema.partial().extend({
  id: z.number(),
});

export type CreateUserDetails = z.infer<typeof userSchema>;
export type UpdateUserDetails = z.infer<typeof updateUserSchema>;
