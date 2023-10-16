import { z } from "zod";

export const getLessonSchema = z.object({
  id: z.coerce.number(),
  courseId: z.coerce.number(),
});

export type GetLessonInput = z.infer<typeof getLessonSchema>;