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
        new User({
          id: -1,
          username: "",
          name: "",
          isAdmin: false,
          fixedIncome: new Decimal(0),
          balance: new Decimal(0),
          email: new Email("grupo@bala.com"),
          password: Password.fromHash("")
        })
    );

    pg.exists.mockImplementation(async () => true);
  });

  test("nome de usuário inexistente deve falhar", async () => {
    pg.getByUsername.mockImplementationOnce(_ => {
      throw new Error("");
    });

    const loginUser = new LoginUser(pg);

    await expect(
      loginUser.loginUser("invalid", Password.fromHash(""))
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