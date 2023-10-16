import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveGoal } from "../../../usecases/goals/removeGoal";
import { RemoveGoalInput } from "../schemas/goals/removeGoal.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class RemoveGoalController {
  readonly useCase: RemoveGoal;

  constructor(useCase: RemoveGoal) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { goalId } = request.body as RemoveGoalInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      await this.useCase.remove(token.id, goalId);

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