import { z } from "zod";

export const getTransactionsByPeriodSchema = z.object({
  view: z.union([z.literal("Day"), z.literal("Week"), z.literal("Month")]),
  initDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type GetTransactionsByPeriodInput
  = z.infer<typeof getTransactionsByPeriodSchema>;