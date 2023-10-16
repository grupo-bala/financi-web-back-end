import { z } from "zod";

export const removeLessonSchema = z.object({
  id: z.coerce.number(),
  courseId: z.coerce.number(),
});

export type RemoveLessonInput = z.infer<typeof removeLessonSchema>;