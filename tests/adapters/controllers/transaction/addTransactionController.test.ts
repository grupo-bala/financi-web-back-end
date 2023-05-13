/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import {
  AddTransaction,
} from "../../../../src/usecases/transaction/addTransaction";
import { Transaction } from "../../../../src/model/transaction";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/transaction/addTransaction");

describe("testes do controller de adicionar uma transação", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso sem erros deve retornar 201", async () => {
    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    mock(AddTransaction).mockImplementation(() => {
      return {
        add: async (_: Transaction) => {},
      };
    });

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/add-transaction",
      payload: {
        categoryId: "1",
        date: new Date().toISOString(),
        description: "",
        isEntry: "true",
        title: "",
        value: "123.1",
      },
      cookies: {
        "financi-jwt": token.encoded,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  test(
    "caso de uso com erros deve falhar com status 404 e uma msg",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(AddTransaction).mockImplementation(() => {
        return {
          add: async (_: Transaction) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "POST",
        url: "http://localhost/add-transaction",
        payload: {
          categoryId: "-1",
          date: new Date().toISOString(),
          description: "",
          isEntry: "true",
          title: "",
          value: "123.1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toHaveProperty("msg");
    },
  );
});