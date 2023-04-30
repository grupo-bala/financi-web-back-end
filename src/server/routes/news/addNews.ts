import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { AddNewsController } from "../../../adapters/controllers/news/addNewsController";

export async function registerAddNewsRoute(fastify: FastifyInstance) {
  fastify.post("/add-news", {
    schema: {
      body: $ref("addNewsSchema"),
    },
  }, async (request, response) => {
    await new AddNewsController().handle(request, response);
  });
}