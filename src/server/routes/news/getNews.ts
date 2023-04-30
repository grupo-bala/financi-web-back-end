import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { GetNewsController } from "../../../adapters/controllers/news/getNewsController";

export async function registerGetNewsRoute(fastify: FastifyInstance) {
  fastify.get("/get-news", {
    schema: {
      querystring: $ref("getNewsSchema"),
    },
  }, async (request, response) => {
    await new GetNewsController().handle(request, response);
  });
}