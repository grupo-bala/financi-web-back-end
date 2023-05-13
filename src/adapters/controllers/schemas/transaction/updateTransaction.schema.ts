import { z } from "zod";

export const updateTransactionSchema = z.object({
  value: z.coerce.number(),
  date: z.coerce.date(),
  categoryId: z.coerce.number(),
  title: z.string(),
  description: z.string(),
  isEntry: z.coerce.boolean(),
  id: z.coerce.number(),
});

export type updateTransactionInput = z.infer<typeof updateTransactionSchema>;