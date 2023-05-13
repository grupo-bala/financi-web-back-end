import { z } from "zod";

export const addTransactionSchema = z.object({
  value: z.coerce.number(),
  date: z.coerce.date(),
  categoryId: z.coerce.number(),
  title: z.string(),
  description: z.string(),
  isEntry: z.coerce.boolean(),
});

export type addTransactionInput = z.infer<typeof addTransactionSchema>;