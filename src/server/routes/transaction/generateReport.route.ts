import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { generateReportSchema } from "../../../adapters/controllers/schemas/transaction/generateReport.schema";
import { GenerateReportController } from "../../../adapters/controllers/transaction/generateReport.controller";
import { GenerateReport } from "../../../usecases/transaction/generateReport";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";
import { PostgresUserRepository } from "../../../adapters/repositories/postgresUserRepository";

export async function registerGenerateReportRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/generate-report", {
    schema: {
      querystring: generateReportSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new GenerateReportController(
      new GenerateReport(
        new PostgresTransactionRepository(),
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}