import { FastifyInstance } from "fastify";
import {
  RemoveNewsController,
} from "../../../adapters/controllers/news/removeNews.controller";
import { RemoveNews } from "../../../usecases/news/removeNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerRemoveNewsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete("/remove-news", {
    schema: {
      body: schemas.removeNewsSchema,
      tags: ["news"],
    },
  }, async (req, res) => {
    await new RemoveNewsController(
      new RemoveNews(
        new PostgresNewsRepository(),
      ),
    ).handle(req, res);
  });
}