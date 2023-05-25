import { FastifyReply, FastifyRequest } from "fastify";
import { GetCategoriesByPeriod } from "../../../usecases/statistics/getCategoriesByPeriod";
import { GetCategoriesByPeriodInput } from "../schemas/statistics/getCategoriesByPeriod.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class GetCategoriesByPeriodController {
  readonly usecase: GetCategoriesByPeriod;

  constructor(usecase: GetCategoriesByPeriod) {
    this.usecase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      initDate,
      endDate,
    } = request.query as GetCategoriesByPeriodInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      const categories = await this.usecase.get(
        token.id,
        { initDate, endDate },
      );

      await reply
        .status(StatusCodes.OK)
        .send({
          data: categories,
        });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}