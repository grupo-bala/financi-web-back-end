import { FastifyInstance } from "fastify";
import { registerLoginRoute } from "../routes/login";
import { registerRegisterRoute } from "../routes/register";
import { registerAddNewsRoute } from "../routes/news/addNews";
import { schemas } from "../../adapters/controllers/schemas/buildSchemas";
import { validateJWT } from "../hooks/auth";
import { verifyIsAdmin } from "../hooks/admin";
import {
  registerGetAllNewsPreviewRoute,
} from "../routes/news/getAllNewsPreview";
import { registerRemoveNewsRoute } from "../routes/news/removeNews";
import { registerGetNewsRoute } from "../routes/news/getNews";
import { registerUpdateNewsRoute } from "../routes/news/updateNews";
import cors from "@fastify/cors";

async function registerFreeRoutes(fastify: FastifyInstance) {
  registerLoginRoute(fastify);
  registerRegisterRoute(fastify);
  registerGetAllNewsPreviewRoute(fastify);
  registerGetNewsRoute(fastify);
}

async function registerAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
  fastify.addHook("preHandler", verifyIsAdmin);

  registerAddNewsRoute(fastify);
  registerRemoveNewsRoute(fastify);
  registerUpdateNewsRoute(fastify);
}

async function registerAuthRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
}

export async function registerHandlers(fastify: FastifyInstance) {
  for (const schema of schemas) {
    fastify.addSchema(schema);
  }

  fastify.register(cors, {
    origin: "*",
  });

  fastify.register(registerFreeRoutes);
  fastify.register(registerAuthRoutes);
  fastify.register(registerAdminRoutes);
}