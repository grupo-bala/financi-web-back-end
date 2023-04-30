import { z } from "zod";

export const getAllNewsSchema = z.object({
  page: z.number(),
  size: z.number(),
});

export type GetAllNewsInput = z.infer<typeof getAllNewsSchema>;