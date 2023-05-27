import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransaction } from "../../../usecases/transaction/getTransaction";
import { getTransactionInput } from "../schemas/transaction/getTransaction.schema";
import { StatusCodes } from "http-status-codes";

export class GetTransactionController {
  private readonly useCase: GetTransaction;

  constructor(useCase: GetTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as getTransactionInput;

    try {
      const {
        categoryId,
        date,
        id: transactionId,
        isEntry,
        title,
        value,
      } = await this.useCase.get(id);

      await reply
        .status(StatusCodes.OK)
        .send({
          data: {
            categoryId,
            date,
            transactionId,
            isEntry,
            title,
            value,
          },
        });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}