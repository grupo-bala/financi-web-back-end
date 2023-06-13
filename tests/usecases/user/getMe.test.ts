import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresUserRepository,
} from "../../../src/adapters/repositories/postgresUserRepository";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import { User } from "../../../src/model/user";
import { GetMe } from "../../../src/usecases/user/getMe";
import { mock } from "../../util";
import { Email } from "../../../src/model/data/email";
import { Password } from "../../../src/model/data/password";

jest.mock("../../../src/adapters/repositories/postgresUserRepository");

describe("testes de obter o usuário", () => {
  test("deve falhar pois o usuário não existe", async () => {
    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getById: async (_id: number) => {
          throw new Error();
        },
      };
    });

    const invalidId = -1;

    await expect(
      new GetMe(
        new PostgresUserRepository(),
        new PostgresTransactionRepository(),
      ).getMe(invalidId),
    ).rejects.toThrow();
  });

  test("deve retornar o usuário com id válido", async () => {
    const noMoney = 0;
    const returnUser = new User({
      id: 0,
      name: "",
      username: "",
      isAdmin: false,
      fixedIncome: new Decimal(noMoney),
      balance: new Decimal(noMoney),
      email: new Email("test@gmail.com"),
      password: Password.fromHash(""),
    });

    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getById: async (_id: number) => returnUser,
      };
    });

    await expect(
      new GetMe(
        new PostgresUserRepository(),
        new PostgresTransactionRepository(),
      ).getMe(returnUser.id),
    ).resolves.toEqual({
      ...returnUser,
      entries: null,
      outs: null,
    });
  });
});