import { Decimal } from "@prisma/client/runtime/library";
import { PostgresUserRepository } from "../../src/adapters/repositories/postgresUserRepository";
import { Password } from "../../src/model/data/password";
import { User } from "../../src/model/user";
import { LoginUser } from "../../src/usecases/loginUser";
import { Email } from "../../src/model/data/email";

jest.mock("../../src/adapters/repositories/postgresUserRepository");
const pg = jest.mocked(new PostgresUserRepository());

describe("testes de login de usuário", () => {
  beforeAll(() => {
    pg.getByUsername.mockImplementation(
      async () => 
        new User(-1, "", "", new Decimal(-1), new Decimal(-1), new Email("grupo@bala.com"), Password.fromHash(""))
    );

    pg.exists.mockImplementation(async () => true);
  });

  test("nome de usuário inexistente deve falhar", async () => {
    pg.exists.mockImplementationOnce(async () => false);
    const loginUser = new LoginUser(pg);

    await expect(
      loginUser.loginUser("", Password.fromHash(""))
    ).rejects.toThrow();
  });

  test("senha incorreta deve falhar", async () => {
    const loginUser = new LoginUser(pg);

    await expect(
      loginUser.loginUser("", Password.fromString("senha"))
    ).rejects.toThrow();
  });

  test("usuário existente e senha correta deve passar", async () => {
    const loginUser = new LoginUser(pg);

    await expect(
      loginUser.loginUser("", Password.fromHash(""))
    ).resolves.not.toThrow();
  });
});