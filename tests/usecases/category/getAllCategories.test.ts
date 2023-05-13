import {
  PostgresCategoryRepository,
} from "../../../src/adapters/repositories/postgresCategoryRepository";
import {
  GetAllCategories,
} from "../../../src/usecases/category/getAllCategories";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresCategoryRepository");

describe("testes de pegar todas as categorias", () => {
  test("deve passar sem problemas", async () => {
    mock(PostgresCategoryRepository).mockImplementation(() => {
      return {
        getAll: async () => {
          return [];
        },
      };
    });

    const getAllCategories = new GetAllCategories(
      new PostgresCategoryRepository(),
    );

    await expect(getAllCategories.getAll())
      .resolves
      .toBeInstanceOf(Array);
  });
});