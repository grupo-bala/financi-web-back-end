import { z } from "zod";

export const removeTransactionSchema = z.object({
  id: z.coerce.number(),
});

export type removeTransactionInput = z.infer<typeof removeTransactionSchema>;