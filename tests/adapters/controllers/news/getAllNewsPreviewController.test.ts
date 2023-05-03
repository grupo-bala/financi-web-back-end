import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import {
  GetAllNewsPreview,
} from "../../../../src/usecases/news/getAllNewsPreview";
import { mock } from "../../../util";
import { NewsPreview } from "../../../../src/model/newsPreview";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/news/getAllNewsPreview");

describe("testes do controller de pegar o preview de várias notícias", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "deve falhar com status 400 e uma mensagem, " +
    "pois a página é um número menor que 1",
    async () => {
      mock(GetAllNewsPreview).mockImplementation(() => {
        return {
          getAll: async (_: number, __: number) => {
            throw new Error(
              "A página deve ser um número positivo maior que zero",
            );
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-news-preview",
        query: {
          page: "0",
          size: "10",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toEqual({
        msg: "A página deve ser um número positivo maior que zero",
      });
    },
  );

  test(
    "deve falhar com status 400 e uma mensagem, " +
    "pois o size é um número menor que 1",
    async () => {
      mock(GetAllNewsPreview).mockImplementation(() => {
        return {
          getAll: (_: number, __: number) => {
            throw new Error(
              "O tamanho deve ser um número positivo maior que zero",
            );
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-news-preview",
        query: {
          page: "1",
          size: "0",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toEqual({
        msg: "O tamanho deve ser um número positivo maior que zero",
      });
    },
  );

  test(
    "caso de uso sem erros deve passar com status 200, " +
    "mas com um array de previews vazio devido a falta de notícias no banco",
    async () => {
      mock(GetAllNewsPreview).mockImplementation(() => {
        return {
          getAll: async () => {
            return {
              previews: [],
              howManyPages: 0,
            };
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-news-preview",
        query: {
          page: "1",
          size: "10",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK),
      expect(response.json()).toEqual({
        data: [],
        pages: 0,
      });
    },
  );

  test(
    "caso de uso sem erros deve passar com status 200 " +
    "e com um array de previews populado",
    async () => {
      const id = 1;

      const newsPreview = new NewsPreview(
        id,
        "",
        "",
        new Date(),
      );

      mock(GetAllNewsPreview).mockImplementation(() => {
        return {
          getAll: async () => {
            return {
              previews: [newsPreview],
              howManyPages: 1,
            };
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-news-preview",
        query: {
          page: "1",
          size: "10",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK),
      expect(response.json()).toEqual({
        data: [
          {
            id,
            imgURL: "",
            publishDate: newsPreview.publishDate.toISOString(),
            title: "",
          },
        ],
        pages: 1,
      });
    },
  );
});