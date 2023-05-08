import { registerUserSchema } from "./registerUserSchema";
import { loginUserSchema } from "./loginUserSchema";
import { addNewsSchema } from "./news/addNewsSchema";
import { getAllNewsPreviewSchema } from "./news/getAllNewsPreviewSchema";
import { removeNewsSchema } from "./news/removeNewsSchema";
import { getNewsSchema } from "./news/getNewsSchema";
import { updateNewsSchema } from "./news/updateNewsSchema";

export const schemas = {
  registerUserSchema,
  loginUserSchema,
  addNewsSchema,
  getAllNewsSchema: getAllNewsPreviewSchema,
  removeNewsSchema,
  getNewsSchema,
  updateNewsSchema,
};