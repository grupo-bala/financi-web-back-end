import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import {
  GetNewsController,
} from "../../../adapters/controllers/news/getNewsController";
import { GetNews } from "../../../usecases/news/getNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerGetNewsRoute(fastify: FastifyInstance) {
  fastify.get("/get-news", {
    schema: {
      querystring: $ref("getNewsSchema"),
    },
  }, async (request, response) => {
    await new GetNewsController(
      new GetNews(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}