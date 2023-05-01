import { FastifyInstance } from "fastify";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import {
  RemoveNewsController,
} from "../../../adapters/controllers/news/removeNewsController";
import { RemoveNews } from "../../../usecases/news/removeNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerRemoveNewsRoute(fastify: FastifyInstance) {
  fastify.post("/remove-news", {
    schema: {
      body: $ref("removeNewsSchema"),
    },
  }, async (request, response) => {
    await new RemoveNewsController(
      new RemoveNews(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}