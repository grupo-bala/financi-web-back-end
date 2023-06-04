import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllGoals } from "../../../usecases/goals/getAllGoals";
import { GetAllGoalsInput } from "../schemas/goals/getAllGoals.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class GetAllGoalsController {
  readonly useCase: GetAllGoals;

  constructor(useCase: GetAllGoals) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size, search } = request.query as GetAllGoalsInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      const { goals, howManyPages } = await this.useCase.getAll(
        token.id,
        page,
        size,
        search,
      );

      await reply
        .status(StatusCodes.OK)
        .send({
          data: goals,
          pages: howManyPages,
        });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}