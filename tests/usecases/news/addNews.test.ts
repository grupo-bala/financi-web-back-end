/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import { News } from "../../../src/model/news";
import {
  AddNews,
} from "../../../src/usecases/news/addNews";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe("testes de adicionar notícias", () => {
  test("deve falhar, pois o título já existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsByTitle: async (_: string) => true,
      };
    });

    const newNews = new News(
      "Financi",
      "",
      "",
      "",
      "",
      false,
      null,
      null,
      null,
    );

    const addNews = new AddNews(new PostgresNewsRepository());

    await expect(addNews.add(newNews))
      .rejects
      .toThrow();
  });

  test("deve passar, pois o título é inédito", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsByTitle: async (_: string) => false,
        add: async (_: News) => {},
      };
    });

    const newNews = new News(
      "Financi",
      "",
      "",
      "",
      "",
      false,
      null,
      null,
      null,
    );

    const addNews = new AddNews(new PostgresNewsRepository());

    await expect(addNews.add(newNews))
      .resolves
      .not
      .toThrow();
  });
});