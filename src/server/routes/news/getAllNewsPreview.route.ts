import { FastifyInstance } from "fastify";
import {
  GetAllNewsPreviewController,
} from "../../../adapters/controllers/news/getAllNewsPreview.controller";
import { GetAllNewsPreview } from "../../../usecases/news/getAllNewsPreview";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { schemas } from "../../../adapters/controllers/schemas/schemas";

export async function registerGetAllNewsPreviewRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-all-news-preview", {
    schema: {
      querystring: schemas.getAllNewsSchema,
      tags: ["news"],
    },
  }, async (req, res) => {
    await new GetAllNewsPreviewController(
      new GetAllNewsPreview(
        new PostgresNewsRepository(),
      ),
    ).handle(req, res);
  });
}