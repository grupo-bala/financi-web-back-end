import { z } from "zod";

export const getAllNewsPreviewSchema = z.object({
  page: z.coerce.number(),
  size: z.coerce.number(),
});

export type GetAllNewsPreviewInput = z.infer<typeof getAllNewsPreviewSchema>;