import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GenerateReportSchema } from "../../../adapters/controllers/schemas/transaction/generateReport.schema";
import { GenerateReportPDFController } from "../../../adapters/controllers/transaction/generateReportPDF.controller";
import { GenerateReportPDF } from "../../../usecases/transaction/generateReportPDF";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";
import { PostgresUserRepository } from "../../../adapters/repositories/postgresUserRepository";

export async function registerGenerateReportPDFRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/generate-report-pdf", {
    schema: {
      querystring: GenerateReportSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new GenerateReportPDFController(
      new GenerateReportPDF(
        new PostgresTransactionRepository(),
        new PostgresUserRepository(),
      ),
    ).handle(req, res);
  });
}