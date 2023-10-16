import { z } from "zod";

export const updateCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  id: z.coerce.number(),
});

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;