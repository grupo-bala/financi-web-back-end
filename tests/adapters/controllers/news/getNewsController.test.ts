import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { GetNews } from "../../../../src/usecases/news/getNews";
import { mock } from "../../../util";
import { News } from "../../../../src/model/news";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/news/getNews");

describe("testes do controller de pegar uma notícia", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "deve falhar com status 404 e uma mensagem, pois a notícia não existe",
    async () => {
      mock(GetNews).mockImplementation(() => {
        return {
          get: async (_: number) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-news",
        query: {
          id: "-1",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test(
    "caso de uso sem erros deve passar com status 200 e uma notícia",
    async () => {
      const news = new News(
        "",
        "",
        "",
        "",
        "",
        null,
        null,
        null,
      );

      mock(GetNews).mockImplementation(() => {
        return {
          get: async (_: number) => news,
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "https://localhost/get-news",
        query: {
          id: "1",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.json()).toEqual({
        data: news,
      });
    },
  );
});