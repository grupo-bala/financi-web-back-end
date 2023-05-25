import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getTransactionsByPeriodSchema } from "../../../adapters/controllers/schemas/statistics/getTransactionsByPeriod.schema";
import { GetTransactionsByPeriodController } from "../../../adapters/controllers/statistics/getTransactionsByPeriod.controller";
import { GetTransactionsByPeriod } from "../../../usecases/statistics/getTransactionsByPeriod";
import { PostgresStatisticsRepository } from "../../../adapters/repositories/postgresStatisticsRepository";

export async function registerGetTransactionsByPeriodRoute(
  fastify: FastifyInstance,
) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/stats/get-transactions-by-period",
    {
      schema: {
        querystring: getTransactionsByPeriodSchema,
        tags: ["statistics"],
      },
    }, async (req, res) => {
      await new GetTransactionsByPeriodController(
        new GetTransactionsByPeriod(
          new PostgresStatisticsRepository(),
        ),
      ).handle(req, res);
    },
  );
}