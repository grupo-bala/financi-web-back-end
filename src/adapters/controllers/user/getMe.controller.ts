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
        id,
        name,
        username,
        isAdmin,
        fixedIncome,
        balance,
        email,
        entries,
        outs,
      } = await this.useCase.getMe(token.id);

      await reply
        .status(StatusCodes.OK)
        .send({
          data: {
            id,
            name,
            username,
            isAdmin,
            fixedIncome,
            balance,
            email: email.value,
            entries,
            outs,
          },
        });
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}