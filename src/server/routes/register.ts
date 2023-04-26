import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { RegisterUserController } from "../../adapters/controllers/registerUserController";

export async function registerRegisterRoute(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      body: $ref("registerUserSchema")
    }
  }, async (request, response) => {
    await new RegisterUserController().handle(request, response);
  });
}