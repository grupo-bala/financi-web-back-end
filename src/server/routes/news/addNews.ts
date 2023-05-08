import { FastifyInstance } from "fastify";
import {
  AddNewsController,
} from "../../../adapters/controllers/news/addNewsController";
import { AddNews } from "../../../usecases/news/addNews";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerAddNewsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/add-news", {
    schema: {
      body: schemas.addNewsSchema,
      tags: ["news"],
    },
  }, async (req, res) => {
    await new AddNewsController(
      new AddNews(
        new PostgresNewsRepository(),
      ),
    ).handle(req, res);
  });
}