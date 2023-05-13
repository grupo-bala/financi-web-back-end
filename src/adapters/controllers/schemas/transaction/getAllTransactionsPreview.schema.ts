import { z } from "zod";

export const GetAllTransactionsPreviewSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
});

export type GetAllTransactionsPreviewInput = z.infer<
  typeof GetAllTransactionsPreviewSchema
>;