import { FastifyInstance } from "fastify";
import {
  GetNewsController,
} from "../../../adapters/controllers/news/getNews.controller";
import { GetNews } from "../../../usecases/news/getNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerGetNewsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-news", {
    schema: {
      querystring: schemas.getNewsSchema,
      tags: ["news"],
    },
  }, async (req, res) => {
    await new GetNewsController(
      new GetNews(
        new PostgresNewsRepository(),
      ),
    ).handle(req, res);
  });
}