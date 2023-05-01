import { FastifyInstance } from "fastify";
import {
  GetAllNewsController,
} from "../../../adapters/controllers/news/getAllNewsController";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { GetAllNews } from "../../../usecases/news/getAllNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerGetAllNewsRoute(fastify: FastifyInstance) {
  fastify.get("/get-all-news", {
    schema: {
      querystring: $ref("getAllNewsSchema"),
    },
  }, async (request, response) => {
    await new GetAllNewsController(
      new GetAllNews(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}