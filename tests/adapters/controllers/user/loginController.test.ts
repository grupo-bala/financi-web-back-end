import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { LoginUser } from "../../../../src/usecases/user/loginUser";
import { Token } from "../../../../src/adapters/data/token";
import { Password } from "../../../../src/model/data/password";
import { StatusCodes } from "http-status-codes";
import { mock } from "../../../util";
import { EnviromentVars } from "../../../../src/server/config/enviromentVars";

const server = Fastify();
jest.mock("../../../../src/usecases/user/loginUser.ts");
jest.mock("../../../../src/server/config/enviromentVars.ts");

describe("testes do controller de login", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    `caso de uso sem erros, em debug, deve retornar status code 200
    e um token não vazio e seguro`,
    async () => {
      const defaultId = 0;
      mock(LoginUser).mockImplementation(() => {
        return {
          loginUser: async (_: string, __: Password) => {
            return Token.encode(defaultId, false);
          },
        };
      });

      Object.defineProperty(
        EnviromentVars,
        "vars",
        {
          get: () => ({
            ENVIRONMENT: "debug",
            COOKIE_DOMAIN: "",
            SECRET_KEY: "test",
          }),
          configurable: true,
        },
      );

      const res = await server.inject({
        method: "POST",
        url: "http://localhost/login",
        payload: {
          username: "test",
          password: "test",
        },
      });

      expect(res.statusCode).toBe(StatusCodes.OK);
    },
  );

  test(
    `caso de uso sem erros, em produção, deve retornar status code 200
    e um token não vazio e inseguro`,
    async () => {
      const defaultId = 0;
      mock(LoginUser).mockImplementation(() => {
        return {
          loginUser: async (_: string, __: Password) => {
            return Token.encode(defaultId, false);
          },
        };
      });

      Object.defineProperty(
        EnviromentVars,
        "vars",
        {
          get: () => ({
            ENVIRONMENT: "production",
            COOKIE_DOMAIN: "",
            SECRET_KEY: "test",
          }),
          configurable: true,
        },
      );

      const res = await server.inject({
        method: "POST",
        url: "http://localhost/login",
        payload: {
          username: "test",
          password: "test",
        },
      });

      expect(res.statusCode).toBe(StatusCodes.OK);
    },
  );

  test("erro no caso de uso deve retornar status code 401", async () => {
    mock(LoginUser).mockImplementation(() => {
      return {
        loginUser: async (_: string, __: Password) => {
          throw new Error("");
        },
      };
    });

    Object.defineProperty(
      EnviromentVars,
      "vars",
      {
        get: () => ({
          ENVIRONMENT: "debug",
          COOKIE_DOMAIN: "",
          SECRET_KEY: "test",
        }),
        configurable: true,
      },
    );

    const res = await server.inject({
      method: "POST",
      url: "http://localhost/login",
      payload: {
        username: "test",
        password: "test",
      },
    });

    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});