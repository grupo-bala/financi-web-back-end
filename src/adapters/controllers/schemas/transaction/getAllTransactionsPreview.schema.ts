import { z } from "zod";

export const GetAllTransactionsPreviewSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
  search: z.string().optional(),
});

export type GetAllTransactionsPreviewInput = z.infer<
  typeof GetAllTransactionsPreviewSchema
>;