import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getTransactionSchema,
} from "../../../adapters/controllers/schemas/transaction/getTransaction.schema";
import {
  GetTransactionController,
} from "../../../adapters/controllers/transaction/getTransaction.controller";
import { GetTransaction } from "../../../usecases/transaction/getTransaction";
import { PostgresTransactionRepository } from "../../../adapters/repositories/postgresTransactionRepository";

export async function registerGetTransactionRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-transaction", {
    schema: {
      querystring: getTransactionSchema,
      tags: ["transactions"],
    },
  }, async (req, res) => {
    await new GetTransactionController(
      new GetTransaction(
        new PostgresTransactionRepository(),
      ),
    ).handle(req, res);
  });
}