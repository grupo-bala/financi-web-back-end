import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import {
  AddNewsController,
} from "../../../adapters/controllers/news/addNewsController";
import { AddNews } from "../../../usecases/news/addNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerAddNewsRoute(fastify: FastifyInstance) {
  fastify.post("/add-news", {
    schema: {
      body: $ref("addNewsSchema"),
    },
  }, async (request, response) => {
    await new AddNewsController(
      new AddNews(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}