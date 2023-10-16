import { z } from "zod";

export const addGoalSchema = z.object({
  title: z.string(),
  totalValue: z.coerce.number(),
  deadline: z.coerce.date(),
});

export type AddGoalInput = z.infer<typeof addGoalSchema>;