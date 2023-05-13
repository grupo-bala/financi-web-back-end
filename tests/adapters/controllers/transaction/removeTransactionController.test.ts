/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import { registerHandlers } from "../../../../src/server/plugins/registerHandlers";
import {
  RemoveTransaction,
} from "../../../../src/usecases/transaction/removeTransaction";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/transaction/removeTransaction");

describe("testes do controller de remover transação", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "caso de uso com erros deve falhar com status 404 e um json com msg",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(RemoveTransaction).mockImplementation(() => {
        return {
          remove: async (_: number) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "DELETE",
        url: "http://localhost/remove-transaction",
        payload: {
          id: "-1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test("caso de uso sem erros deve retornar status 200", async () => {
    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    mock(RemoveTransaction).mockImplementation(() => {
      return {
        remove: async (_: number) => {},
      };
    });

    const response = await server.inject({
      method: "DELETE",
      url: "http://localhost/remove-transaction",
      payload: {
        id: "1",
      },
      cookies: {
        "financi-jwt": token.encoded,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});