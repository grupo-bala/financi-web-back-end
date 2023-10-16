import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  GetMeController,
} from "../../../adapters/controllers/user/getMe.controller";
import {
  GetMe,
} from "../../../usecases/user/getMe";
import {
  PostgresUserRepository,
} from "../../../adapters/repositories/postgresUserRepository";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";

export async function registerGetMeRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-me", {
    schema: {
      tags: ["user"],
    },
  }, async (req, res) => {
    await new GetMeController(
      new GetMe(
        new PostgresUserRepository(),
        new PostgresTransactionRepository(),
      ),
    ).handle(req, res);
  });
}