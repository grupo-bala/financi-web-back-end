import { z } from "zod";

export const updateLessonSchema = z.object({
  name: z.string(),
  durationSeconds: z.coerce.number(),
  videoURL: z.string().url(),
  courseId: z.coerce.number(),
  id: z.coerce.number(),
});

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;