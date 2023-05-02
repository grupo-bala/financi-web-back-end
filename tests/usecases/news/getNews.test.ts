/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import { News } from "../../../src/model/news";
import {
  GetNews,
} from "../../../src/usecases/news/getNews";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe("testes de pegar uma notícia", () => {
  test("deve falhar, pois o id não existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const idToGet = 1;

    const getNews = new GetNews(new PostgresNewsRepository());

    expect(getNews.get(idToGet))
      .rejects
      .toThrow();
  });

  test("deve passar, pois o id existe", async () => {
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

    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        get: async (_: number) => news,
      };
    });

    const idToGet = 1;

    const getNews = new GetNews(new PostgresNewsRepository());

    expect(getNews.get(idToGet))
      .resolves
      .not
      .toThrow();
  });
});