import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
  fixedIncome: z.coerce.number().positive(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;