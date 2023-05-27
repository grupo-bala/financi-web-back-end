import { z } from "zod";

export const generateReportSchema = z.object({
  initDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type GenerateReportInput = z.infer<typeof generateReportSchema>;