import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { RegisterController } from "../../adapters/controllers/registerController";

export async function registerRegisterRoute(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      body: $ref("registerUserSchema")
    }
  }, async (request, response) => {
    await new RegisterController().handle(request, response);
  });
}