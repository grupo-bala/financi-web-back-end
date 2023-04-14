import { RegisterUserController } from "../../adapters/controllers/registerUserController";
import { PostgresUserRepository } from "../../adapters/repositories/postgresUserRepository";
import { RegisterUserOnDb } from "../../usecases/registerUserOnDb";

export function makeRegisterUserController(): RegisterUserController {
  return new RegisterUserController(
    new RegisterUserOnDb(
      new PostgresUserRepository()
    )
  );
}