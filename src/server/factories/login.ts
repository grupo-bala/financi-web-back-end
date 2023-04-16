import { LoginUserController } from "../../adapters/controllers/loginUserController";
import { PostgresUserRepository } from "../../adapters/repositories/postgresUserRepository";
import { LoginUser } from "../../usecases/loginUser";

export function makeLoginUserController(): LoginUserController {
  return new LoginUserController(
    new LoginUser(
      new PostgresUserRepository()
    )
  );
}