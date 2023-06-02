import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateTransaction } from "../../../usecases/transaction/updateTransaction";
import { updateTransactionInput } from "../schemas/transaction/updateTransaction.schema";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "../../../model/transaction";
import { Decimal } from "@prisma/client/runtime/library";
import { Token } from "../../data/token";

export class UpdateTransactionController {
  private readonly useCase: UpdateTransaction;

  constructor(useCase: UpdateTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      categoryId,
      date,
      isEntry,
      title,
      value,
      id,
    } = request.body as updateTransactionInput;

    const token = Token.decode(request.cookies["financi-jwt"]!);

    try {
      await this.useCase.update(
        new Transaction(
          new Decimal(value),
          categoryId,
          title,
          isEntry,
          date,
          token.id,
          id,
        ),
      );
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}