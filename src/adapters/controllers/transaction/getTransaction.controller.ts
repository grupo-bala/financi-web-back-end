import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransaction } from "../../../usecases/transaction/getTransaction";
import { getTransactionInput } from "../schemas/transaction/getTransaction.schema";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../data/token";

export class GetTransactionController {
  private readonly useCase: GetTransaction;

  constructor(useCase: GetTransaction) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as getTransactionInput;
    const token = request.cookies["financi-jwt"]!;
    const userId = Token.decode(token).id;

    try {
      const {
        categoryId,
        date,
        id: transactionId,
        isEntry,
        title,
        value,
      } = await this.useCase.get(id, userId);

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