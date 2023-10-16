/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  GetAllTransactionsPreview,
} from "../../../../src/usecases/transaction/getAllTransactionsPreview";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/transaction/getAllTransactionsPreview");

describe("testes do controller de pegar todos os previews de transação", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso deve falhar, pois a página não é maior que zero",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GetAllTransactionsPreview).mockImplementation(() => {
        return {
          get: async (_: number, __: number) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-transactions-preview",
        query: {
          page: "-1",
          size: "10",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test("caso de uso deve falhar, pois o tamanho não é maior que zero",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GetAllTransactionsPreview).mockImplementation(() => {
        return {
          get: async (_: number, __: number) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-transactions-preview",
        query: {
          page: "1",
          size: "-1",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test(
    "caso de uso sem erros deve passar com status 200, data e um pages",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GetAllTransactionsPreview).mockImplementation(() => {
        return {
          get: async (_: number, __: number) => {
            return {
              previews: [],
              howManyPages: 0,
            };
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-transactions-preview",
        query: {
          page: "1",
          size: "10",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.json()).toHaveProperty("pages");
      expect(response.json()).toHaveProperty("data");
    },
  );
});