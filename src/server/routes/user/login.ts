import { FastifyInstance } from "fastify";
import {
  LoginController,
} from "../../../adapters/controllers/user/loginController";
import {
  PostgresUserRepository,
} from "../../../adapters/repositories/postgresUserRepository";
import { LoginUser } from "../../../usecases/user/loginUser";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerLoginRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/login", {
    schema: {
      body: schemas.loginUserSchema,
      tags: ["user"],
    },
  }, async (req, res) => {
    await new LoginController(
      new LoginUser(
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}