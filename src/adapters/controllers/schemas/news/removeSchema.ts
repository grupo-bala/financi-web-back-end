import { z } from "zod";

export const removeNewsSchema = z.object({
  title: z.string(),
});

export type RemoveNewsInput = z.infer<typeof removeNewsSchema>;