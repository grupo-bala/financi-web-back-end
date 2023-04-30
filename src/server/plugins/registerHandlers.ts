import { FastifyInstance } from "fastify";
import { registerLoginRoute } from "../routes/login";
import { registerRegisterRoute } from "../routes/register";
import { registerAddNewsRoute } from "../routes/news/add";
import { schemas } from "../../adapters/controllers/schemas/buildSchemas";
import { validateJWT } from "../hooks/auth";
import { verifyIsAdmin } from "../hooks/admin";
import { registerGetAllNewsRoute } from "../routes/news/getAll";
import { registerRemoveNewsRoute } from "../routes/news/remove";
import { registerGetNewsRoute } from "../routes/news/get";

async function registerFreeRoutes(fastify: FastifyInstance) {
  registerLoginRoute(fastify);
  registerRegisterRoute(fastify);
  registerGetAllNewsRoute(fastify);
  registerGetNewsRoute(fastify);
}

async function registerAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
  fastify.addHook("preHandler", verifyIsAdmin);

  fastify.get("/admin", async (request, reply) => {
    await reply.send("Ok");
  });

  registerAddNewsRoute(fastify);
  registerRemoveNewsRoute(fastify);
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
  fastify.register(registerAdminRoutes);
}