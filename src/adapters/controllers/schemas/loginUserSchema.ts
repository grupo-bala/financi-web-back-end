import { z } from "zod";

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;