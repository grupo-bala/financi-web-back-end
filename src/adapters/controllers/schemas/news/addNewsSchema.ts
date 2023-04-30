import { z } from "zod";

export const addNewsSchema = z.object({
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  publishDate: z.date(),
  imgURL: z.string(),
});

export type AddNewsInput = z.infer<typeof addNewsSchema>;