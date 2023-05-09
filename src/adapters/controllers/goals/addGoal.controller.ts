import { FastifyReply, FastifyRequest } from "fastify";
import { AddGoal } from "../../../usecases/goals/addGoal";
import { AddGoalInput } from "../schemas/goals/addGoal.schema";
import { Token } from "../../data/token";
import { Decimal } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";

export class AddGoalController {
  readonly useCase: AddGoal;

  constructor(useCase: AddGoal) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      title,
      totalValue,
      deadline,
    } = request.body as AddGoalInput;

    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );
      const noMoney = 0;

      await this.useCase.add({
        id: -1,
        currentValue: new Decimal(noMoney),
        title,
        totalValue: new Decimal(totalValue),
        deadline,
        userId: token.id,
      });

      await reply
        .status(StatusCodes.CREATED)
        .send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: error.message });
    }
  }
}