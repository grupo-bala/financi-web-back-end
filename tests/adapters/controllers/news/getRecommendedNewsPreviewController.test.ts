import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import {
  GetRecommendedNewsPreview,
} from "../../../../src/usecases/news/getRecommendedNewsPreview";
import { mock } from "../../../util";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/news/getRecommendedNewsPreview");

describe(
  "testes do controller de pegar os previews de notícias recomendadas",
  () => {
    beforeAll(() => {
      server.register(registerHandlers);
    });

    test(
      "caso de uso sem problemas deve passar com status code 200 e data",
      async () => {
        mock(GetRecommendedNewsPreview).mockImplementation(() => {
          return {
            get: async () => [],
          };
        });

        const response = await server.inject({
          method: "GET",
          url: "http://localhost/get-recommended-news-preview",
        });

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.json()).toEqual({
          data: [],
        });
      },
    );
  },
);