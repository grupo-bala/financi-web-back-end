/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import { mock } from "../../../util";
import { RegisterUser } from "../../../../src/usecases/user/registerUser";
import { User } from "../../../../src/model/user";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/user/registerUser.ts");

describe("testes do controller de registro", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso sem erros deve retornar status code 201", async () => {
    mock(RegisterUser).mockImplementation(() => {
      return {
        registerUser: async (_: User) => {},
      };
    });

    const res = await server.inject({
      method: "POST",
      url: "http://localhost/register",
      payload: JSON.stringify({
        name: "test",
        email: "test@test.com",
        password: "test",
        username: "test",
        fixedIncome: 1000,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });

  test(
    "caso de uso com erro deve retornar status code 409 e uma mensagem de erro",
    async () => {
      mock(RegisterUser).mockImplementation(() => {
        return {
          registerUser: async (_: User) => {
            throw new Error("error");
          },
        };
      });

      const res = await server.inject({
        method: "POST",
        url: "http://localhost/register",
        payload: JSON.stringify({
          name: "test",
          email: "test@test.com",
          password: "test",
          username: "test",
          fixedIncome: 1000,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const body = await JSON.parse(res.body);

      expect(res.statusCode).toBe(StatusCodes.CONFLICT);
      expect(body.msg).not.toBe("");
    },
  );
});