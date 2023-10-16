import { z } from "zod";

export const getTransactionSchema = z.object({
  id: z.coerce.number(),
});

export type getTransactionInput = z.infer<typeof getTransactionSchema>;