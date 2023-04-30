import { z } from "zod";

export const getNewsSchema = z.object({
  id: z.number(),
});

export type GetNewsInput = z.infer<typeof getNewsSchema>;