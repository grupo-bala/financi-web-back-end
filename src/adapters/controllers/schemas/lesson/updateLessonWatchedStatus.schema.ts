import { z } from "zod";

export const updateLessonWatchedStatusSchema = z.object({
  id: z.coerce.number(),
  courseId: z.coerce.number(),
  status: z.coerce.boolean(),
});

export type UpdateLessonWatchedStatusInput = z.infer<
  typeof updateLessonWatchedStatusSchema
>;