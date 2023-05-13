import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import {
  GetAllGoals,
} from "../../../../src/usecases/goals/getAllGoals";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/goals/getAllGoals");

describe("testes do controller de adicionar metas", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso com erro deve retornar status code 400", async () => {
    mock(GetAllGoals).mockImplementation(() => {
      return {
        getAll: async (_user: number, _page: number, _size: number) => {
          throw new Error();
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "GET",
      url: "http://localhost/get-all-goals",
      cookies: {
        "financi-jwt": token.encoded,
      },
      query: {
        page: "0",
        size: "0",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test(
    "caso de uso sem erro deve retornar status code 200 e lista de metas",
    async () => {
      mock(GetAllGoals).mockImplementation(() => {
        return {
          getAll: async (_user: number, _page: number, _size: number) => {
            return {
              goals: [],
              howManyPages: 0,
            };
          },
        };
      });

      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-goals",
        cookies: {
          "financi-jwt": token.encoded,
        },
        query: {
          page: "1",
          size: "1",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.json()).toEqual({
        data: [],
        pages: 0,
      });
    });
});