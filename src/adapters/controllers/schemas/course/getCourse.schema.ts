import { z } from "zod";

export const getCourseSchema = z.object({
  id: z.coerce.number(),
});

export type GetCourseInput = z.infer<typeof getCourseSchema>;