import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import {
  UpdateNewsController,
} from "../../../adapters/controllers/news/updateNewsController";
import { UpdateNews } from "../../../usecases/news/updateNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerUpdateNewsRoute(fastify: FastifyInstance) {
  fastify.post("/update-news", {
    schema: {
      body: $ref("updateNewsSchema"),
    },
  }, async (request, response) => {
    await new UpdateNewsController(
      new UpdateNews(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}