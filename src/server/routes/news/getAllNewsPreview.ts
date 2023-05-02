import { FastifyInstance } from "fastify";
import {
  GetAllNewsPreviewController,
} from "../../../adapters/controllers/news/getAllNewsPreviewController";
import { $ref } from "../../../adapters/controllers/schemas/buildSchemas";
import { GetAllNewsPreview } from "../../../usecases/news/getAllNewsPreview";
import {
  PostgresNewsRepository,
} from "../../../adapters/repositories/postgresNewsRepository";

export async function registerGetAllNewsPreviewRoute(fastify: FastifyInstance) {
  fastify.get("/get-all-news-preview", {
    schema: {
      querystring: $ref("getAllNewsSchema"),
    },
  }, async (request, response) => {
    await new GetAllNewsPreviewController(
      new GetAllNewsPreview(
        new PostgresNewsRepository(),
      ),
    ).handle(request, response);
  });
}