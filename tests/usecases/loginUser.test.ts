/* eslint-disable no-magic-numbers */
import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresUserRepository,
} from "../../src/adapters/repositories/postgresUserRepository";
import { Password } from "../../src/model/data/password";
import { User } from "../../src/model/user";
import { LoginUser } from "../../src/usecases/loginUser";
import { Email } from "../../src/model/data/email";
import { mock } from "../util";

jest.mock("../../src/adapters/repositories/postgresUserRepository");

describe("testes de login de usuário", () => {
  test("nome de usuário inexistente deve falhar", async () => {
    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getByUsername: async (_: string) => {
          throw new Error("");
        },
      };
    });

    await expect(
      new LoginUser(
        new PostgresUserRepository(),
      ).loginUser("invalid", Password.fromHash("")),
    ).rejects.toThrow();
  });

  test("senha incorreta deve falhar", async () => {
    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getByUsername: async (_: string) => new User({
          id: -1,
          name: "",
          username: "",
          isAdmin: false,
          fixedIncome: new Decimal(0),
          balance: new Decimal(0),
          email: new Email("test@test.com"),
          password: Password.fromHash(""),
        }),
      };
    });

    await expect(
      new LoginUser(
        new PostgresUserRepository(),
      ).loginUser("", Password.fromString("senha")),
    ).rejects.toThrow();
  });

  test("usuário existente e senha correta deve passar", async () => {
    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getByUsername: async (_: string) => new User({
          id: -1,
          name: "",
          username: "",
          isAdmin: false,
          fixedIncome: new Decimal(0),
          balance: new Decimal(0),
          email: new Email("test@test.com"),
          password: Password.fromHash(""),
        }),
      };
    });

    await expect(
      new LoginUser(
        new PostgresUserRepository(),
      ).loginUser("", Password.fromHash("")),
    ).resolves.not.toThrow();
  });
});