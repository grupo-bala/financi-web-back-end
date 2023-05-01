import { FastifyInstance } from "fastify";
import { $ref } from "../../adapters/controllers/schemas/buildSchemas";
import {
  RegisterController,
} from "../../adapters/controllers/registerController";
import { RegisterUser } from "../../usecases/registerUser";
import {
  PostgresUserRepository,
} from "../../adapters/repositories/postgresUserRepository";

export async function registerRegisterRoute(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      body: $ref("registerUserSchema"),
    },
  }, async (request, response) => {
    await new RegisterController(
      new RegisterUser(
        new PostgresUserRepository(),
      ),
    ).handle(request, response);
  });
}