import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  addTransactionSchema,
} from "../../../adapters/controllers/schemas/transaction/addTransaction.schema";
import {
  AddTransactionController,
} from "../../../adapters/controllers/transaction/addTransaction.controller";
import { AddTransaction } from "../../../usecases/transaction/addTransaction";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";
import { PostgresCategoryRepository } from "../../../adapters/repositories/postgresCategoryRepository";

export async function registerAddTransactionRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/add-transaction", {
    schema: {
      body: addTransactionSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new AddTransactionController(
      new AddTransaction(
        new PostgresTransactionRepository(),
        new PostgresCategoryRepository(),
      ),
    ).handle(req, res);
  });
}