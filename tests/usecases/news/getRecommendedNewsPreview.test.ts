import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import {
  GetRecommendedNewsPreview,
} from "../../../src/usecases/news/getRecommendedNewsPreview";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresNewsRepository");

describe(
  "testes do caso de uso de pegar os previews de notícias recomendadas",
  () => {
    test(
      "deve passar com um array de preview de notícias recomendadas",
      async () => {
        mock(PostgresNewsRepository).mockImplementation(() => {
          return {
            getRecommendedPreviews: async () => [],
          };
        });

        const getRecommendedNewsPreview = new GetRecommendedNewsPreview(
          new PostgresNewsRepository(),
        );

        await expect(getRecommendedNewsPreview.get())
          .resolves
          .toEqual([]);
      },
    );
  },
);