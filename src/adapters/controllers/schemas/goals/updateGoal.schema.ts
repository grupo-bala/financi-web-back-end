import { z } from "zod";

export const updateGoalSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  currentValue: z.coerce.number(),
  totalValue: z.coerce.number(),
  deadline: z.coerce.date(),
});

export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;