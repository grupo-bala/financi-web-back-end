import { z } from "zod";

export const addCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type AddCourseInput = z.infer<typeof addCourseSchema>;