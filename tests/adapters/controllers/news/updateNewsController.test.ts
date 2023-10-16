/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { UpdateNews } from "../../../../src/usecases/news/updateNews";
import { mock } from "../../../util";
import { News } from "../../../../src/model/news";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../../../src/adapters/data/token";

const server = Fastify();
jest.mock("../../../../src/usecases/news/updateNews");

describe("testes do controller de atualizar uma notícia", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "deve falhar com status 404 e uma mensagem, pois o id não existe",
    async () => {
      const defaultId = 0;
      const adminToken = Token.encode(defaultId, true);

      mock(UpdateNews).mockImplementation(() => {
        return {
          update: async (_: News) => {
            throw new Error("");
          },
        };
      });

      const response = await server.inject({
        method: "PUT",
        url: "http://localhost/update-news",
        cookies: {
          "financi-jwt": adminToken.encoded,
        },
        payload: {
          author: "",
          content: "",
          imgURL: "",
          summary: "",
          title: "",
          updateDate: new Date().toISOString(),
          id: "-1",
          recommended: "true",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test(
    "deve falhar com status 409 e uma mensagem, pois o novo título já existe",
    async () => {
      const defaultId = 0;
      const adminToken = Token.encode(defaultId, true);

      mock(UpdateNews).mockImplementation(() => {
        return {
          update: async (_: News) => {
            throw new Error("Uma notícia com esse nome já existe");
          },
        };
      });

      const response = await server.inject({
        method: "PUT",
        url: "http://localhost/update-news",
        cookies: {
          "financi-jwt": adminToken.encoded,
        },
        payload: {
          author: "",
          content: "",
          imgURL: "",
          summary: "",
          title: "",
          updateDate: new Date().toISOString(),
          id: "1",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.CONFLICT);
      expect(response.json()).toHaveProperty("msg");
    },
  );

  test("caso de uso sem erros deve passar com status 200", async () => {
    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    mock(UpdateNews).mockImplementation(() => {
      return {
        update: async (_: News) => {},
      };
    });

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-news",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        author: "",
        content: "",
        imgURL: "",
        summary: "",
        title: "",
        updateDate: new Date().toISOString(),
        id: "1",
        recommended: "true",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});