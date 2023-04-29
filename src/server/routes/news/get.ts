import { FastifyInstance } from "fastify";
import { GetNewsController } from "../../../adapters/controllers/news/getController";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";

export async function registerGetNewsRoute(fastify: FastifyInstance) {
  fastify.get("/get-news", {
    schema: {
      querystring: $ref("getNewsSchema"),
    },
  }, async (request, response) => {
    await new GetNewsController().handle(request, response);
  });
}