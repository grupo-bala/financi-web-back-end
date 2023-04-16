import { RegisterUserController } from "../../adapters/controllers/registerUserController";
import { PostgresUserRepository } from "../../adapters/repositories/postgresUserRepository";
import { RegisterUser } from "../../usecases/registerUser";

export function makeRegisterUserController(): RegisterUserController {
  return new RegisterUserController(
    new RegisterUser(
      new PostgresUserRepository()
    )
  );
}