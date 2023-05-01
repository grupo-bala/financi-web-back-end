import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import { LoginController } from "../../adapters/controllers/loginController";
import {
  PostgresUserRepository,
} from "../../adapters/repositories/postgresUserRepository";
import { LoginUser } from "../../usecases/loginUser";

export async function registerLoginRoute(fastify: FastifyInstance) {
  fastify.get("/login", {
    schema: {
      querystring: $ref("loginUserSchema"),
    },
  }, async (request, response) => {
    await new LoginController(
      new LoginUser(
        new PostgresUserRepository(),
      ),
    ).handle(request, response);
  });
}