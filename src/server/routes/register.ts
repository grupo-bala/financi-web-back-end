import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { makeRegisterUserController } from "../factories/register";

export async function registerRoute(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      body: $ref("registerUserSchema")
    }
  }, async (request, response) => {
    await makeRegisterUserController().handle(request, response);
  });
}