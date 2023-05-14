import { z } from "zod";

export const updateNewsSchema = z.object({
  id: z.coerce.number(),
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  updateDate: z.coerce.date(),
  imgURL: z.string(),
  recommended: z.coerce.boolean(),
});

export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;