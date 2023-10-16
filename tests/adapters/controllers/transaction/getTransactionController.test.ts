import Fastify from "fastify";
import { registerHandlers } from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { GetTransaction } from "../../../../src/usecases/transaction/getTransaction";
import { mock } from "../../../util";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "../../../../src/model/transaction";
import { Decimal } from "@prisma/client/runtime/library";

const server = Fastify();

jest.mock("../../../../src/usecases/transaction/getTransaction");

describe("testes do controller de pegar uma transação", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "caso de uso com erros deve falhar com status 404 e um json com msg",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GetTransaction).mockImplementation(() => {
        return {
          get: async (_: number) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-transaction",
        query: {
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

  test(
    "caso de uso sem erros deve passar com status 200 e um json com data",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);
      const categoryId = 1;
      const transactionId = 1;
      const transaction = new Transaction(
        new Decimal("123.1"),
        categoryId,
        "",
        true,
        new Date(),
        defaultId,
        transactionId,
      );

      mock(GetTransaction).mockImplementation(() => {
        return {
          get: async (_: number) => transaction,
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-transaction",
        query: {
          id: "1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.json()).toEqual({
        data: {
          categoryId: transaction.categoryId,
          date: transaction.date.toISOString(),
          isEntry: transaction.isEntry,
          title: transaction.title,
          transactionId: transaction.id,
          value: transaction.value.toString(),
        },
      });
    },
  );
});