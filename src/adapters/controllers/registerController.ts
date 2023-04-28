import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserInput } from "./schemas/registerUserSchema";
import { User } from "../../model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../model/data/email";
import { RegisterUser } from "../../usecases/registerUser";
import { Password } from "../../model/data/password";
import { StatusCodes } from "http-status-codes";
import { PostgresUserRepository } from "../repositories/postgresUserRepository";

export class RegisterController {
  private readonly registerUser = new RegisterUser(new PostgresUserRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as RegisterUserInput;
    
    try {
      const newUser = new User({
        id: -1,
        balance: new Decimal(0),
        email: new Email(body.email),
        isAdmin: false,
        fixedIncome: new Decimal(body.fixedIncome),
        name: body.name,
        password: Password.fromString(body.password),
        username: body.username
      });
      
      await this.registerUser.registerUser(newUser);
      await reply.status(StatusCodes.CREATED).send();
    } catch (error) {
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: (error as Error).message });
    }
  }
}
