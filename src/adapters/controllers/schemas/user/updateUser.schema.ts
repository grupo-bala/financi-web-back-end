import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  fixedIncome: z.coerce.number().positive(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;