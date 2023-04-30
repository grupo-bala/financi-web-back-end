import { buildJsonSchemas } from "fastify-zod";
import { registerUserSchema } from "./registerUserSchema";
import { loginUserSchema } from "./loginUserSchema";
import { addNewsSchema } from "./news/addNewsSchema";
import { getAllNewsSchema } from "./news/getAllNewsSchema";
import { removeNewsSchema } from "./news/removeNewsSchema";
import { getNewsSchema } from "./news/getNewsSchema";
import { updateNewsSchema } from "./news/updateNewsSchema";

export const { schemas, $ref } = buildJsonSchemas({
  registerUserSchema,
  loginUserSchema,
  addNewsSchema,
  getAllNewsSchema,
  removeNewsSchema,
  getNewsSchema,
  updateNewsSchema,
});