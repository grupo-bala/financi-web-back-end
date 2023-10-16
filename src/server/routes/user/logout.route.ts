import { FastifyInstance } from "fastify";
import {
  LogoutController,
} from "../../../adapters/controllers/user/logout.controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function registerLogoutRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/logout", {
    schema: {
      tags: ["user"],
    },
  }, async (req, res) => {
    await new LogoutController().handle(req, res);
  });
}