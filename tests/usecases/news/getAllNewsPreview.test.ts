import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import { NewsPreview } from "../../../src/model/newsPreview";
import {
  GetAllNewsPreview,
} from "../../../src/usecases/news/getAllNewsPreview";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe("testes de pegar todos os previews de todas as notícias", () => {
  test("deve falhar, pois a página é negativa", async () => {
    const getAllNewsPreview = new GetAllNewsPreview(
      new PostgresNewsRepository(),
    );

    const page = -1;
    const size = 10;

    await expect(getAllNewsPreview.getAll(page, size))
      .rejects
      .toThrow("A página deve ser um número positivo maior que zero");
  });

  test("deve falhar, pois o size é negativo", async () => {
    const getAllNewsPreview = new GetAllNewsPreview(
      new PostgresNewsRepository(),
    );

    const page = 1;
    const size = -1;

    await expect(getAllNewsPreview.getAll(page, size))
      .rejects
      .toThrow("O tamanho deve ser um número positivo maior que zero");
  });

  test("deve passar, mas com um array de previews vazio", async () => {
    const empty = 0;

    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        getSize: async () => empty,
      };
    });

    const getAllNewsPreview = new GetAllNewsPreview(
      new PostgresNewsRepository(),
    );

    const page = 1;
    const size = 10;

    await expect(getAllNewsPreview.getAll(page, size))
      .resolves
      .toEqual({
        previews: [],
        howManyPages: 0,
      });
  });

  test("deve passar com um array de previews", async () => {
    const databaseSize = 1;
    const id = 1;
    const news = new NewsPreview(
      id,
      "",
      "",
      new Date(),
      false,
    );

    mock(PostgresNewsRepository).mockImplementation(() => {
      return {
        getSize: async () => databaseSize,
        getAllPreviews: async (_: number, __: number) => [news],
      };
    });

    const getAllNewsPreview = new GetAllNewsPreview(
      new PostgresNewsRepository(),
    );

    const page = 1;
    const size = 10;

    await expect(getAllNewsPreview.getAll(page, size))
      .resolves
      .toEqual({
        previews: [news],
        howManyPages: 1,
      });
  });
});