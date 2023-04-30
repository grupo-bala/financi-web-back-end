import { buildJsonSchemas } from "fastify-zod";
import { registerUserSchema } from "./registerUserSchema";
import { loginUserSchema } from "./loginUserSchema";
import { addNewsSchema } from "./news/addSchema";
import { getAllNewsSchema } from "./news/getAllSchema";
import { removeNewsSchema } from "./news/removeSchema";

export const { schemas, $ref } = buildJsonSchemas({
  registerUserSchema,
  loginUserSchema,
  addNewsSchema,
  getNewsSchema: getAllNewsSchema,
  removeNewsSchema,
});