import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserInput } from "../schemas/user/registerUserSchema";
import { User } from "../../../model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../../model/data/email";
import { RegisterUser } from "../../../usecases/user/registerUser";
import { Password } from "../../../model/data/password";
import { StatusCodes } from "http-status-codes";

export class RegisterController {
  readonly useCase: RegisterUser;

  constructor(useCase: RegisterUser) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as RegisterUserInput;
    const emptyBalance = 0;

    try {
      const newUser = new User({
        id: -1,
        balance: new Decimal(emptyBalance),
        email: new Email(body.email),
        isAdmin: false,
        fixedIncome: new Decimal(body.fixedIncome),
        name: body.name,
        password: Password.fromString(body.password),
        username: body.username,
      });

      await this.useCase.registerUser(newUser);
      await reply.status(StatusCodes.CREATED).send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: error.message });
    }
  }
}
