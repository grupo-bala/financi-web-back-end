import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsByPeriod } from "../../../usecases/statistics/getTransactionsByPeriod";
import { GetTransactionsByPeriodInput } from "../schemas/statistics/getTransactionsByPeriod.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class GetTransactionsByPeriodController {
  readonly usecase: GetTransactionsByPeriod;

  constructor(usecase: GetTransactionsByPeriod) {
    this.usecase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      initDate,
      endDate,
      view,
    } = request.query as GetTransactionsByPeriodInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      const transactions = await this.usecase.get(
        token.id,
        { initDate, endDate },
        view,
      );

      await reply
        .status(StatusCodes.OK)
        .send({
          data: transactions,
        });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}