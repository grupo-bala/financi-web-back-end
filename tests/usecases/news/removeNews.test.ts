/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import {
  RemoveNews,
} from "../../../src/usecases/news/removeNews";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe("testes de remover notícia", () => {
  test("deve falhar, pois o id não existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const idToBeRemoved = 1;

    const removeNews = new RemoveNews(new PostgresNewsRepository());

    await expect(removeNews.remove(idToBeRemoved))
      .rejects
      .toThrow();
  });

  test("deve passar, pois o id existe", async () => {
    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        remove: async (_: number) => {},
      };
    });

    const idToBeRemoved = 1;

    const removeNews = new RemoveNews(new PostgresNewsRepository());

    await expect(removeNews.remove(idToBeRemoved))
      .resolves
      .not
      .toThrow();
  });
});