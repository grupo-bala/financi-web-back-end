/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-magic-numbers */
import { User } from "../../src/model/user";
import { RegisterUser } from "../../src/usecases/registerUser";
import {
  PostgresUserRepository,
} from "../../src/adapters/repositories/postgresUserRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../src/model/data/email";
import { Password } from "../../src/model/data/password";
import { mock } from "../util";

jest.mock("../../src/adapters/repositories/postgresUserRepository");

describe("testes de cadastro de usuário", () => {
  test("usuário inexistente deve passar", async () => {
    const newUser = new User({
      id: -1,
      username: "valid",
      name: "",
      isAdmin: false,
      fixedIncome: new Decimal(0),
      balance: new Decimal(0),
      email: new Email("grupo@bala.com"),
      password: Password.fromHash(""),
    });

    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        exists: async (_: string) => false,
        add: async (_: User) => newUser,
      };
    });

    const registerUser = new RegisterUser(
      new PostgresUserRepository(),
    );

    await expect(
      registerUser.registerUser(newUser),
    ).resolves.not.toThrow();
  });

  test("usuário existente deve falhar", async () => {
    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        exists: async (_: string) => true,
      };
    });

    const registerUser = new RegisterUser(
      new PostgresUserRepository(),
    );

    await expect(registerUser.registerUser(
      new User({
        id: -1,
        username: "valid",
        name: "",
        isAdmin: false,
        fixedIncome: new Decimal(0),
        balance: new Decimal(0),
        email: new Email("grupo@bala.com"),
        password: Password.fromHash(""),
      }),
    )).rejects.toThrow();
  });
});