/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import {
  UpdateTransaction,
} from "../../../../src/usecases/transaction/updateTransaction";
import { Transaction } from "../../../../src/model/transaction";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/transaction/updateTransaction");

describe("testes do controller de atualizar uma transação", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso sem erros deve passar com status 200", async () => {
    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    mock(UpdateTransaction).mockImplementation(() => {
      return {
        update: async (_: Transaction) => {},
      };
    });

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-transaction",
      payload: {
        value: "123.1",
        date: new Date().toISOString(),
        categoryId: "1",
        title: "",
        description: "",
        isEntry: "true",
        id: "1",
      },
      cookies: {
        "financi-jwt": token.encoded,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test(
    "caso de uso falha, pois a transação não existe e " +
    "retorna status 404 e um json com msg",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(UpdateTransaction).mockImplementation(() => {
        return {
          update: async (_: Transaction) => {
            throw new Error("Essa transação não existe");
          },
        };
      });

      const response = await server.inject({
        method: "PUT",
        url: "http://localhost/update-transaction",
        payload: {
          value: "123.1",
          date: new Date().toISOString(),
          categoryId: "1",
          title: "",
          description: "",
          isEntry: "true",
          id: "-1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toEqual({
        msg: "Essa transação não existe",
      });
    },
  );

  test(
    "caso de uso falha, pois a categoria não existe e " +
    "retorna status 404 e um json com msg",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(UpdateTransaction).mockImplementation(() => {
        return {
          update: async (_: Transaction) => {
            throw new Error("Essa categoria não existe");
          },
        };
      });

      const response = await server.inject({
        method: "PUT",
        url: "http://localhost/update-transaction",
        payload: {
          value: "123.1",
          date: new Date().toISOString(),
          categoryId: "-1",
          title: "",
          description: "",
          isEntry: "true",
          id: "1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toEqual({
        msg: "Essa categoria não existe",
      });
    },
  );
});