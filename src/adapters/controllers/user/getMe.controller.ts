import { FastifyReply, FastifyRequest } from "fastify";
import { GetMe } from "../../../usecases/user/getMe";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class GetMeController {
  readonly useCase: GetMe;

  constructor(useCase: GetMe) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      const {
        name,
        username,
        fixedIncome,
        balance,
        email,
      } = await this.useCase.getMe(token.id);

      await reply
        .status(StatusCodes.OK)
        .send({
          name,
          username,
          fixedIncome,
          balance,
          email: email.value,
        });
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}