/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import { News } from "../../../src/model/news";
import {
  UpdateNews,
} from "../../../src/usecases/news/updateNews";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe("", () => {
  test("deve falhar, pois o id não existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const idToBeUpdated = -1;
    const news = new News(
      "",
      "",
      "",
      "",
      "",
      false,
      null,
      null,
      idToBeUpdated,
    );
    const updateNews = new UpdateNews(new PostgresNewsRepository());

    await expect(updateNews.update(news))
      .rejects
      .toThrow("Essa notícia não existe");
  });

  test("deve falhar, pois o título já existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        existsByTitle: async (_: string) => true,
      };
    });

    const idToBeUpdated = 1;
    const news = new News(
      "",
      "",
      "",
      "",
      "",
      false,
      null,
      null,
      idToBeUpdated,
    );
    const updateNews = new UpdateNews(new PostgresNewsRepository());

    await expect(updateNews.update(news))
      .rejects
      .toThrow("Uma notícia com esse nome já existe");
  });

  test("deve passar, pois o id existe e o título é inédito", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        existsByTitle: async (_: string) => false,
        update: async (_: News) => {},
      };
    });

    const idToBeUpdated = 1;
    const news = new News(
      "",
      "",
      "",
      "",
      "",
      false,
      null,
      null,
      idToBeUpdated,
    );
    const updateNews = new UpdateNews(new PostgresNewsRepository());

    await expect(updateNews.update(news))
      .resolves
      .not
      .toThrow();
  });
});