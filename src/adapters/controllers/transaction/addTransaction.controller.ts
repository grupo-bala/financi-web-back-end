import { FastifyReply, FastifyRequest } from "fastify";
import { AddTransaction } from "../../../usecases/transaction/addTransaction";
import { addTransactionInput } from "../schemas/transaction/addTransaction.schema";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "../../../model/transaction";
import { Decimal } from "@prisma/client/runtime/library";
import { Token } from "../../data/token";

export class AddTransactionController {
  private readonly useCase: AddTransaction;

  constructor(useCase: AddTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      categoryId,
      date,
      isEntry,
      title,
      value,
    } = request.body as addTransactionInput;
    const token = Token.decode(request.cookies["financi-jwt"]!);

    try {
      const transaction = await this.useCase.add(
        new Transaction(
          new Decimal(value),
          categoryId,
          title,
          isEntry,
          date,
          token.id,
          null,
        ),
      );

      await reply
        .status(StatusCodes.CREATED)
        .send({ data: transaction });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}