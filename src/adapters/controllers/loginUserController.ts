import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUser } from "../../usecases/loginUser";
import { LoginUserInput } from "./schemas/loginUserSchema";
import { StatusCodes } from "http-status-codes";
import { Password } from "../../model/data/password";

export class LoginUserController {
  private readonly loginUser: LoginUser;

  constructor(loginUser: LoginUser) {
    this.loginUser = loginUser;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as LoginUserInput;

    try {
      const jwt = await this.loginUser.loginUser(query.username, Password.fromString(query.password));
      await reply
        .send({ msg: jwt.encoded });
    } catch (error) {
      await reply
        .status(StatusCodes.UNAUTHORIZED)
        .send({ msg: (error as Error).message });
    }
  }
}