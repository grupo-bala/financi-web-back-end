import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { LoginController } from "../../adapters/controllers/loginController";

export async function registerLoginRoute(fastify: FastifyInstance) {
  fastify.get("/login", {
    schema: {
      querystring: $ref("loginUserSchema")
    }
  }, async (request, response) => {
    await new LoginController().handle(request, response);
  });
}