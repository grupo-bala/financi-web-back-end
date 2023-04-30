import { z } from "zod";

export const removeNewsSchema = z.object({
  id: z.number(),
});

export type RemoveNewsInput = z.infer<typeof removeNewsSchema>;