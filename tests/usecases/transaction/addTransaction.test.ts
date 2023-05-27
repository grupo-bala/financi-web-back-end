/* eslint-disable @typescript-eslint/no-empty-function */
import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import {
  PostgresCategoryRepository,
} from "../../../src/adapters/repositories/postgresCategoryRepository";
import {
  AddTransaction,
} from "../../../src/usecases/transaction/addTransaction";
import { Transaction } from "../../../src/model/transaction";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresTransactionRepository");
jest.mock("../../../src/adapters/repositories/postgresCategoryRepository");

describe("testes do caso de uso de adicionar transação", () => {
  test(
    "adicionar transação com categoria existente deve passar",
    async () => {
      mock(PostgresTransactionRepository).mockImplementation(() => {
        return {
          add: async () => {},
        };
      });

      mock(PostgresCategoryRepository).mockImplementation(() => {
        return {
          existsById: async (_: number) => true,
        };
      });

      const categoryId = 1;
      const userId = 1;

      const newTransaction = new Transaction(
        new Decimal("100"),
        categoryId,
        "",
        true,
        new Date(),
        userId,
        null,
      );

      const addTransaction = new AddTransaction(
        new PostgresTransactionRepository(),
        new PostgresCategoryRepository(),
      );

      await expect(addTransaction.add(newTransaction))
        .resolves
        .not
        .toThrow();
    },
  );

  test(
    "adicionar transação com categoria inexistente deve falhar",
    async () => {
      mock(PostgresCategoryRepository).mockImplementation(() => {
        return {
          existsById: async (_: number) => false,
        };
      });

      const categoryId = 1;
      const userId = 1;

      const newTransaction = new Transaction(
        new Decimal("100"),
        categoryId,
        "",
        true,
        new Date(),
        userId,
        null,
      );

      const addTransaction = new AddTransaction(
        new PostgresTransactionRepository(),
        new PostgresCategoryRepository(),
      );

      await expect(addTransaction.add(newTransaction))
        .rejects
        .toThrow(Error);
    },
  );
});