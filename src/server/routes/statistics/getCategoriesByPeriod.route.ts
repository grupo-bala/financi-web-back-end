import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getCategoriesByPeriodSchema } from "../../../adapters/controllers/schemas/statistics/getCategoriesByPeriod.schema";
import { GetCategoriesByPeriod } from "../../../usecases/statistics/getCategoriesByPeriod";
import { GetCategoriesByPeriodController } from "../../../adapters/controllers/statistics/getCategoriesByPeriod.controller";
import { PostgresStatisticsRepository } from "../../../adapters/repositories/postgresStatisticsRepository";

export async function registerGetCategoriesByPeriodRoute(
  fastify: FastifyInstance,
) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/stats/get-categories-by-period",
    {
      schema: {
        querystring: getCategoriesByPeriodSchema,
        tags: ["statistics"],
      },
    }, async (req, res) => {
      await new GetCategoriesByPeriodController(
        new GetCategoriesByPeriod(
          new PostgresStatisticsRepository(),
        ),
      ).handle(req, res);
    },
  );
}