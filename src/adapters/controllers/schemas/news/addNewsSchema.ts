import { z } from "zod";

export const addNewsSchema = z.object({
  author: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  publishDate: z.coerce.date(),
  imgURL: z.string(),
  recommended: z.coerce.boolean(),
});

export type AddNewsInput = z.infer<typeof addNewsSchema>;