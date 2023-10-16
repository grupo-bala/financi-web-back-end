import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  updateTransactionSchema,
} from "../../../adapters/controllers/schemas/transaction/updateTransaction.schema";
import {
  UpdateTransactionController,
} from "../../../adapters/controllers/transaction/updateTransaction.controller";
import { UpdateTransaction } from "../../../usecases/transaction/updateTransaction";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";
import { PostgresCategoryRepository } from "../../../adapters/repositories/postgresCategoryRepository";

export async function registerUpdateTransactionRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-transaction", {
    schema: {
      body: updateTransactionSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new UpdateTransactionController(
      new UpdateTransaction(
        new PostgresTransactionRepository(),
        new PostgresCategoryRepository(),
      ),
    ).handle(req, res);
  });
}