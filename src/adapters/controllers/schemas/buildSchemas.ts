import { buildJsonSchemas } from "fastify-zod";
import { registerUserSchema } from "./registerUserSchema";

export const { schemas, $ref } = buildJsonSchemas({
  registerUserSchema
});