import { FastifyInstance } from "fastify";
import { GetAllNewsController } from "../../../adapters/controllers/news/getAllNewsController";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";

export async function registerGetAllNewsRoute(fastify: FastifyInstance) {
  fastify.get("/get-all-news", {
    schema: {
      querystring: $ref("getAllNewsSchema"),
    },
  }, async (request, response) => {
    await new GetAllNewsController().handle(request, response);
  });
}