import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateGoal } from "../../../usecases/goals/updateGoal";
import { UpdateGoalInput } from "../schemas/goals/updateGoal.schema";
import { Token } from "../../data/token";
import { Goal } from "../../../model/goal";
import { Decimal } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";

export class UpdateGoalController {
  readonly useCase: UpdateGoal;

  constructor(useCase: UpdateGoal) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      id,
      title,
      currentValue,
      totalValue,
      deadline,
    } = request.body as UpdateGoalInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      await this.useCase.update(
        new Goal({
          id,
          title,
          currentValue: new Decimal(currentValue),
          totalValue: new Decimal(totalValue),
          deadline,
          userId: token.id,
        }),
      );

      await reply
        .status(StatusCodes.OK)
        .send();
    } catch (e) {
      const error = e as Error;
      if (error.message.includes("Já existe")) {
        await reply
          .status(StatusCodes.CONFLICT)
          .send({ msg: error.message });
      } else {
        await reply
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: error.message });
      }
    }
  }
}