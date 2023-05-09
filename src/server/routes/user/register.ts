import { FastifyInstance } from "fastify";
import {
  RegisterController,
} from "../../../adapters/controllers/user/registerController";
import { RegisterUser } from "../../../usecases/user/registerUser";
import {
  PostgresUserRepository,
} from "../../../adapters/repositories/postgresUserRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerRegisterRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/register", {
    schema: {
      body: schemas.registerUserSchema,
      tags: ["user"],
    },
  }, async (req, res) => {
    await new RegisterController(
      new RegisterUser(
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}