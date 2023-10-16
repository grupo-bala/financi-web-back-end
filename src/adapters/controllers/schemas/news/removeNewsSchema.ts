import { z } from "zod";

export const removeNewsSchema = z.object({
  id: z.coerce.number(),
});

export type RemoveNewsInput = z.infer<typeof removeNewsSchema>;