import { User } from "../../src/model/user";
import { RegisterUser } from "../../src/usecases/registerUser";
import { PostgresUserRepository } from "../../src/adapters/repositories/postgresUserRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../src/model/data/email";
import { Password } from "../../src/model/data/password";

jest.mock("../../src/adapters/repositories/postgresUserRepository");
const pg = jest.mocked(new PostgresUserRepository());

describe("testes de cadastro de usuário", () => {
  test("usuário inexistente deve passar", async () => {
    pg.exists.mockImplementation(async () => {
      return false;
    });

    const registerUser = new RegisterUser(pg);

    await expect(registerUser.registerUser(
      new User(-1, "", "valid", new Decimal(-1), new Decimal(-1), new Email("email@email.com"), Password.fromHash(""))
    )).resolves.not.toThrow();
  });

  test("usuário existente deve falhar", async () => {
    pg.exists.mockImplementation(async () => {
      return true;
    });

    const registerUser = new RegisterUser(pg);

    await expect(registerUser.registerUser(
      new User(-1, "", "valid", new Decimal(-1), new Decimal(-1), new Email("email@email.com"), Password.fromHash(""))
    )).rejects.toThrow();
  });
});