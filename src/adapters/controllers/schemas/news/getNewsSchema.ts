import { z } from "zod";

export const getNewsSchema = z.object({
  page: z.number(),
  size: z.number(),
});

export type GetNewsInput = z.infer<typeof getNewsSchema>;