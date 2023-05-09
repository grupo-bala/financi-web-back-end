import { z } from "zod";

export const getAllGoalsSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
});

export type GetAllGoalsInput = z.infer<typeof getAllGoalsSchema>;