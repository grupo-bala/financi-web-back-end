import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUser } from "../../usecases/loginUser";
import { LoginUserInput } from "./schemas/loginUserSchema";
import { StatusCodes } from "http-status-codes";
import { Password } from "../../model/data/password";

export class LoginController {
  readonly useCase: LoginUser;

  constructor(useCase: LoginUser) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const query = request.body as LoginUserInput;

    try {
      const jwt = await this.useCase.loginUser(
        query.username,
        Password.fromString(query.password),
      );

      await reply
        .setCookie("financi-jwt", jwt.encoded, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
        })
        .send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.UNAUTHORIZED)
        .send({ msg: error.message });
    }
  }
}