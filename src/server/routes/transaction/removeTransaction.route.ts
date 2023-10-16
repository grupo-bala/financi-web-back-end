import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  removeTransactionSchema,
} from "../../../adapters/controllers/schemas/transaction/removeTransaction.schema";
import {
  RemoveTransactionController,
} from "../../../adapters/controllers/transaction/removeTransaction.controller";
import { RemoveTransaction } from "../../../usecases/transaction/removeTransaction";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";

export async function registerRemoveTransactionRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete("/remove-transaction", {
    schema: {
      body: removeTransactionSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new RemoveTransactionController(
      new RemoveTransaction(
        new PostgresTransactionRepository(),
      ),
    ).handle(req, res);
  });
}