import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUser } from "../../../usecases/user/updateUser";
import { Token } from "../../data/token";
import { UpdateUserInput } from "../schemas/user/updateUser.schema";
import { Email } from "../../../model/data/email";
import { StatusCodes } from "http-status-codes";

export class UpdateUserController {
  readonly useCase: UpdateUser;

  constructor(usecase: UpdateUser) {
    this.useCase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const token = Token.decode(
      request.cookies["financi-jwt"]!,
    );

    const { name, email, fixedIncome } = request.body as UpdateUserInput;

    try {
      await this.useCase.update(
        token.id,
        new Email(email),
        name,
        fixedIncome,
      );

      await reply.send();
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}