import { FastifyInstance } from "fastify";
import { registerLoginRoute } from "../routes/login";
import { registerRegisterRoute } from "../routes/register";
import { schemas } from "../../adapters/controllers/schemas/buildSchemas";
import { validateJWT } from "../hooks/auth";

async function registerFreeRoutes(fastify: FastifyInstance) {
  registerLoginRoute(fastify);
  registerRegisterRoute(fastify);
}

async function registerAuthRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);

  fastify.get("/dev", async (request, reply) => {
    await reply.send("Ok");
  });
}

export async function registerHandlers(fastify: FastifyInstance) {
  for (const schema of schemas) {
    fastify.addSchema(schema);
  }

  fastify.register(registerFreeRoutes);
  fastify.register(registerAuthRoutes);
}