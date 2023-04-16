import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { makeLoginUserController } from "../factories/login";

export async function loginRoute(fastify: FastifyInstance) {
  fastify.get("/login", {
    schema: {
      querystring: $ref("loginUserSchema")
    }
  }, async (request, response) => {
    await makeLoginUserController().handle(request, response);
  });
}