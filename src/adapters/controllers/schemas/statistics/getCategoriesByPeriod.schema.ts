import { z } from "zod";

export const getCategoriesByPeriodSchema = z.object({
  initDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type GetCategoriesByPeriodInput
  = z.infer<typeof getCategoriesByPeriodSchema>;