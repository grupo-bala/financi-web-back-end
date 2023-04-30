import { z } from "zod";

export const getNewsSchema = z.object({
  title: z.string(),
});

export type GetNewsInput = z.infer<typeof getNewsSchema>;