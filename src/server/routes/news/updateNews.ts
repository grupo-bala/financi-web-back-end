import { FastifyInstance } from "fastify";
import {
  UpdateNewsController,
} from "../../../adapters/controllers/news/updateNewsController";
import { UpdateNews } from "../../../usecases/news/updateNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerUpdateNewsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-news", {
    schema: {
      body: schemas.updateNewsSchema,
      tags: ["news"],
    },
  }, async (req, res) => {
    await new UpdateNewsController(
      new UpdateNews(
        new PostgresNewsRepository(),
      ),
    ).handle(req, res);
  });
}