import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveTransaction } from "../../../usecases/transaction/removeTransaction";
import { removeTransactionInput } from "../schemas/transaction/removeTransaction.schema";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../data/token";

export class RemoveTransactionController {
  private readonly useCase: RemoveTransaction;

  constructor(useCase: RemoveTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.body as removeTransactionInput;
    const token = request.cookies["financi-jwt"]!;
    const userId = Token.decode(token).id;

    try {
      await this.useCase.remove(id, userId);

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