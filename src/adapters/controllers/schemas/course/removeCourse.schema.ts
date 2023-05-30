import { z } from "zod";

export const RemoveCourseSchema = z.object({
  id: z.coerce.number(),
});

export type RemoveCourseInput = z.infer<typeof RemoveCourseSchema>;