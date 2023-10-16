import { z } from "zod";

export const getAllLessonsSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
  courseId: z.coerce.number(),
});

export type GetAllLessonsInput = z.infer<typeof getAllLessonsSchema>;