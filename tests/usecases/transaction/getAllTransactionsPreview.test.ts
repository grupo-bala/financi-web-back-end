import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import { TransactionPreview } from "../../../src/model/transactionPreview";
import {
  GetAllTransactionsPreview,
} from "../../../src/usecases/transaction/getAllTransactionsPreview";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresTransactionRepository");

describe(
  "testes do caso de uso de pegar todos os previews de transação",
  () => {
    test("deve falhar, pois a página é negativa", async () => {
      const getAllTransactionsPreview = new GetAllTransactionsPreview(
        new PostgresTransactionRepository(),
      );

      const page = -1;
      const size = 10;

      await expect(getAllTransactionsPreview.get(page, size))
        .rejects
        .toThrow("A página deve ser um número positivo maior que zero");
    });

    test("deve falhar, pois o size é negativo", async () => {
      const getAllTransactionsPreview = new GetAllTransactionsPreview(
        new PostgresTransactionRepository(),
      );

      const page = 1;
      const size = -10;

      await expect(getAllTransactionsPreview.get(page, size))
        .rejects
        .toThrow("O tamanho deve ser um número positivo maior que zero");
    });

    test("teste deve passar, mas com um array de previews vazio", async () => {
      const empty = 0;

      mock(PostgresTransactionRepository).mockImplementation(() => {
        return {
          getSize: async () => empty,
        };
      });

      const getAllTransactionsPreview = new GetAllTransactionsPreview(
        new PostgresTransactionRepository(),
      );

      const page = 1;
      const size = 10;

      await expect(getAllTransactionsPreview.get(page, size))
        .resolves
        .toEqual({
          previews: [],
          howManyPages: 0,
        });
    });

    test("teste deve passar array de previews", async () => {
      const id = 1;
      const databaseSize = 1;
      const date = new Date();
      const categoryId = 1;
      const transactionPreview = new TransactionPreview(
        new Decimal("123.1"),
        categoryId,
        "",
        true,
        date,
        id,
      );

      mock(PostgresTransactionRepository).mockImplementation(() => {
        return {
          getSize: async () => databaseSize,
          getAllPreviews: async (_: number, __: number) => [transactionPreview],
        };
      });

      const getAllTransactionsPreview = new GetAllTransactionsPreview(
        new PostgresTransactionRepository(),
      );

      const page = 1;
      const size = 10;

      await expect(getAllTransactionsPreview.get(page, size))
        .resolves
        .toEqual({
          previews: [transactionPreview],
          howManyPages: 1,
        });
    });
  },
);