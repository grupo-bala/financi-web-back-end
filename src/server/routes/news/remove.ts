import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { RemoveNewsController } from "../../../adapters/controllers/news/removeController";

export async function registerRemoveNewsRoute(fastify: FastifyInstance) {
  fastify.post("/remove-news", {
    schema: {
      body: $ref("removeNewsSchema"),
    },
  }, async (request, response) => {
    await new RemoveNewsController().handle(request, response);
  });
}