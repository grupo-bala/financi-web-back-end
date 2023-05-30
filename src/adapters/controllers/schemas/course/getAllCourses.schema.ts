import { z } from "zod";

export const getAllCoursesSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
});

export type GetAllCoursesInput = z.infer<typeof getAllCoursesSchema>;