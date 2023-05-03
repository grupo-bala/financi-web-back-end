/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { RemoveNews } from "../../../../src/usecases/news/removeNews";
import { mock } from "../../../util";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/news/removeNews");

describe("testes do controller de remover uma notícia", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("deve falhar com status 404, pois a notícia não existe", async () => {
    const adminToken = Token.encode("admin", true);

    mock(RemoveNews).mockImplementation(() => {
      return {
        remove: async (_: number) => {
          throw new Error("");
        },
      };
    });

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/remove-news",
      headers: {
        Authorization: `Bearer ${adminToken.encoded}`,
      },
      payload: {
        id: "-1",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.json()).toHaveProperty("msg");
  });

  test("caso de uso sem erros deve passar com status 200", async () => {
    const adminToken = Token.encode("admin", true);

    mock(RemoveNews).mockImplementation(() => {
      return {
        remove: async (_: number) => {},
      };
    });

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/remove-news",
      headers: {
        Authorization: `Bearer ${adminToken.encoded}`,
      },
      payload: {
        id: "1",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});