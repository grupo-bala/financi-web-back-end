import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { User } from "../../../../src/model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../../../src/model/data/email";
import { Password } from "../../../../src/model/data/password";
import { mock } from "../../../util";
import { GetMe } from "../../../../src/usecases/user/getMe";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/user/getMe.ts");

describe("testes do controller de obter usuário", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "caso de uso sem erros deve retornar status code 200 e um usuário",
    async () => {
      const testId = 0;
      const noMoney = 0;
      const token = Token.encode(testId, false);
      const returnUser = new User({
        id: testId,
        name: "name",
        username: "username",
        isAdmin: false,
        fixedIncome: new Decimal(noMoney),
        balance: new Decimal(noMoney),
        email: new Email("test@gmail.com"),
        password: Password.fromHash(""),
      });

      mock(GetMe).mockImplementation(() => {
        return {
          getMe: async (_id: number) => ({
            ...returnUser,
            entries: new Decimal(noMoney),
            outs: new Decimal(noMoney),
          }),
        };
      });

      const res = await server.inject({
        method: "GET",
        url: "http://localhost/get-me",
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      const { data: { name, username } } = res.json();

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(name).toBe(returnUser.name);
      expect(username).toBe(returnUser.username);
    });

  test("erro no caso de uso deve retornar status code 400", async () => {
    const testId = 0;
    const token = Token.encode(testId, false);

    mock(GetMe).mockImplementation(() => {
      return {
        getMe: async (_id: number) => {
          throw new Error();
        },
      };
    });

    const res = await server.inject({
      method: "GET",
      url: "http://localhost/get-me",
      cookies: {
        "financi-jwt": token.encoded,
      },
    });

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});