import Fastify from "fastify";
import { registerHandlers } from "../../../src/server/plugins/registerHandlers";
import { LoginUser } from "../../../src/usecases/loginUser";
import { Token } from "../../../src/adapters/data/token";
import { Password } from "../../../src/model/data/password";
import { mock } from "../../util";

const server = Fastify();
jest.mock("../../../src/usecases/loginUser.ts");

describe("testes do controller de login", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso sem erros deve retornar status code 200 e um token não vazio", async () => {
    mock(LoginUser).mockImplementation(() => {
      return {
        loginUser: async (_: string, __: Password) => Token.encode("test", false),
      }
    });

    const res = await server.inject({
      method: "GET",
      url: `http://localhost:${process.env.PORT}/login`,
      query: {
        username: "test",
        password: "test"
      }
    });

    const body = await JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(body.msg).not.toBe("");
  });

  test("erro no caso de uso deve retornar status code 401", async () => {
    mock(LoginUser).mockImplementation(() => {
      return {
        loginUser: async (_: string, __: Password) => {
          throw new Error("");
        },
      }
    });

    const res = await server.inject({
      method: "GET",
      url: `http://localhost:${process.env.PORT}/login`,
      query: {
        username: "test",
        password: "test"
      }
    });

    expect(res.statusCode).toBe(401);
  });
});