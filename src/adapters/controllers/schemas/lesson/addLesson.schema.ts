import { z } from "zod";

export const addLessonSchema = z.object({
  name: z.string(),
  durationSeconds: z.coerce.number(),
  videoURL: z.string().url(),
  courseId: z.coerce.number(),
});

export type AddLessonInput = z.infer<typeof addLessonSchema>;