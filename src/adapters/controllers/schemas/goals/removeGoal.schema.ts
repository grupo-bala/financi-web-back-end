import { z } from "zod";

export const removeGoalSchema = z.object({
  goalId: z.coerce.number(),
});

export type RemoveGoalInput = z.infer<typeof removeGoalSchema>;