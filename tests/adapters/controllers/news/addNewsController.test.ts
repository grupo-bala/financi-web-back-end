/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { AddNews } from "../../../../src/usecases/news/addNews";
import { mock } from "../../../util";
import { News } from "../../../../src/model/news";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../../../src/adapters/data/token";

const server = Fastify();
jest.mock("../../../../src/usecases/news/addNews");

describe("testes do controller de adicionar notícia", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "deve falhar com status 409 e uma mensagem, pois o título já existe",
    async () => {
      const adminToken = Token.encode("admin", true);

      mock(AddNews).mockImplementation(() => {
        return {
          add: async (_: News) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "POST",
        url: "http://localhost/add-news",
        headers: {
          Authorization: `Bearer ${adminToken.encoded}`,
        },
        payload: {
          author: "test",
          title: "test",
          summary: "test",
          content: "test",
          publishDate: new Date().toISOString(),
          imgURL: "test",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.CONFLICT);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test(
    "caso de uso sem erros deve passar com status 201",
    async () => {
      const adminToken = Token.encode("admin", true);

      mock(AddNews).mockImplementation(() => {
        return {
          add: async (_: News) => {},
        };
      });

      const response = await server.inject({
        method: "POST",
        url: "http://localhost/add-news",
        headers: {
          Authorization: `Bearer ${adminToken.encoded}`,
        },
        payload: {
          author: "test",
          title: "test",
          summary: "test",
          content: "test",
          publishDate: new Date().toISOString(),
          imgURL: "test",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.CREATED);
    },
  );
});