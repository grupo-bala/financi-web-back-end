import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { UpdateNewsController } from "../../../adapters/controllers/news/updateController";

export async function registerUpdateNewsRoute(fastify: FastifyInstance) {
  fastify.post("/update-news", {
    schema: {
      body: $ref("updateNewsSchema"),
    },
  }, async (request, response) => {
    await new UpdateNewsController().handle(request, response);
  });
}