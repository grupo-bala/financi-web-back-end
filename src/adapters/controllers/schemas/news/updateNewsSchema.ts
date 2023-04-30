import { z } from "zod";

export const updateNewsSchema = z.object({
  id: z.number(),
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  updateDate: z.date(),
  imgURL: z.string(),
});

export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;