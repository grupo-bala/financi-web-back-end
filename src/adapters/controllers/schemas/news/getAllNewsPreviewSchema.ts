import { z } from "zod";

export const getAllNewsPreviewSchema = z.object({
  page: z.number(),
  size: z.number(),
});

export type GetAllNewsPreviewInput = z.infer<typeof getAllNewsPreviewSchema>;