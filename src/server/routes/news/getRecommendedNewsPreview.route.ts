import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetRecommendedNewsPreview } from "../../../usecases/news/getRecommendedNewsPreview";
import { PostgresNewsRepository } from "../../../adapters/repositories/postgresNewsRepository";
import { GetRecommendedNewsPreviewController } from "../../../adapters/controllers/news/getRecommendedNewsPreview.controller";

export async function registerGetRecommendedNewsPreviewRoute(
  fastify: FastifyInstance,
) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/get-recommended-news-preview", {
      schema: {
        tags: ["news"],
      },
    }, async (req, res) => {
      await new GetRecommendedNewsPreviewController(
        new GetRecommendedNewsPreview(
          new PostgresNewsRepository(),
        ),
      ).handle(req, res);
    },
  );
}