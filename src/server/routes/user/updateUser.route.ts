import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { updateUserSchema } from "../../../adapters/controllers/schemas/user/updateUser.schema";
import { UpdateUserController } from "../../../adapters/controllers/user/updateUser.controller";
import { UpdateUser } from "../../../usecases/user/updateUser";
import { PostgresUserRepository } from "../../../adapters/repositories/postgresUserRepository";

export async function registerUpdateUserRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-user", {
    schema: {
      body: updateUserSchema,
      tags: ["user"],
    },
  }, async (req, res) => {
    await new UpdateUserController(
      new UpdateUser(
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}