import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
  fixedIncome: z.number(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;