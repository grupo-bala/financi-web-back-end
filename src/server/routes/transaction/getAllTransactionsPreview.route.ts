import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetAllTransactionsPreviewSchema } from "../../../adapters/controllers/schemas/transaction/getAllTransactionsPreview.schema";
import { GetAllTransactionsPreviewController } from "../../../adapters/controllers/transaction/getAllTransactionsPreview.controller";
import { GetAllTransactionsPreview } from "../../../usecases/transaction/getAllTransactionsPreview";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";

export async function registerGetAllTransactionsPreviewRoute(
  fastify: FastifyInstance,
) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    "/get-all-transactions-preview",
    {
      schema: {
        querystring: GetAllTransactionsPreviewSchema,
        tags: ["transactions"],
      },
    },
    async (req, res) => {
      await new GetAllTransactionsPreviewController(
        new GetAllTransactionsPreview(
          new PostgresTransactionRepository(),
        ),
      ).handle(req, res);
    },
  );
}