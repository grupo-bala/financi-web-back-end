import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GenerateReportSchema } from "../../../adapters/controllers/schemas/transaction/generateReport.schema";
import { GenerateReportXLSXController } from "../../../adapters/controllers/transaction/generateReportXLSX.controller";
import { GenerateReportXLSX } from "../../../usecases/transaction/generateReportXLSX";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";
import { PostgresUserRepository } from "../../../adapters/repositories/postgresUserRepository";

export async function registerGenerateReportXLSX(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/generate-report-xlsx", {
    schema: {
      querystring: GenerateReportSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new GenerateReportXLSXController(
      new GenerateReportXLSX(
        new PostgresTransactionRepository(),
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}