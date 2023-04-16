import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserInput } from "./schemas/registerUserSchema";
import { User } from "../../model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../model/data/email";
import { RegisterUser } from "../../usecases/registerUser";
import { Password } from "../../model/data/password";
import { StatusCodes } from "http-status-codes";

export class RegisterUserController {
  private readonly registerUser: RegisterUser;

  constructor(registerUser: RegisterUser) {
    this.registerUser = registerUser;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as RegisterUserInput;
    
    try {
      const newUser = new User(
        -1,
        body.name,
        body.username,
        new Decimal(body.fixedIncome),
        new Decimal(0),
        new Email(body.email),
        new Password(body.password)
      );
      
      await this.registerUser.registerUser(newUser);
      await reply.status(StatusCodes.CREATED).send();
    } catch (error) {
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: (error as Error).message });
    }
  }
}
