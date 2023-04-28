import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { LoginUserController } from "../../adapters/controllers/loginUserController";

export async function registerLoginRoute(fastify: FastifyInstance) {
  fastify.get("/login", {
    schema: {
      querystring: $ref("loginUserSchema")
    }
  }, async (request, response) => {
    await new LoginUserController().handle(request, response);
  });
}