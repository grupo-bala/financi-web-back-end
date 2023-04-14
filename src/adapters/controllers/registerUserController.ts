import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserInput } from "./schemas/registerUserSchema";
import { User } from "../../model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../model/data/email";
import { RegisterUserOnDb } from "../../usecases/registerUserOnDb";
import { Password } from "../../model/data/password";

export class RegisterUserController {
  private readonly registerUser: RegisterUserOnDb;

  constructor(registerUser: RegisterUserOnDb) {
    this.registerUser = registerUser;
  }

  async handle(request: FastifyRequest, _reply: FastifyReply) {
    const body = request.body as RegisterUserInput;
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
  }
}
