import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveTransaction } from "../../../usecases/transaction/removeTransaction";
import { removeTransactionInput } from "../schemas/transaction/removeTransaction.schema";
import { StatusCodes } from "http-status-codes";

export class RemoveTransactionController {
  private readonly useCase: RemoveTransaction;

  constructor(useCase: RemoveTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.body as removeTransactionInput;

    try {
      await this.useCase.remove(id);

      await reply
        .status(StatusCodes.OK)
        .send();
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}