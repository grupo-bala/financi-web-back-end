import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUser } from "../../../usecases/user/loginUser";
import { LoginUserInput } from "../schemas/user/loginUserSchema";
import { StatusCodes } from "http-status-codes";
import { Password } from "../../../model/data/password";
import { EnviromentVars } from "../../../server/config/enviromentVars";

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
          domain: EnviromentVars.vars.COOKIE_DOMAIN,
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