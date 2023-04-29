import { buildJsonSchemas } from "fastify-zod";
import { registerUserSchema } from "./registerUserSchema";
import { loginUserSchema } from "./loginUserSchema";
import { addNewsSchema } from "./news/addSchema";
import { getNewsSchema } from "./news/getSchema";
import { removeNewsSchema } from "./news/removeSchema";

export const { schemas, $ref } = buildJsonSchemas({
  registerUserSchema,
  loginUserSchema,
  addNewsSchema,
  getNewsSchema,
  removeNewsSchema,
});