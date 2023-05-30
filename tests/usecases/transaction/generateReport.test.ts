import Fastify from "fastify";
import { registerHandlers } from "../../../src/server/plugins/registerHandlers";
import { mock } from "../../util";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import {
  PostgresUserRepository,
} from "../../../src/adapters/repositories/postgresUserRepository";
import {
  GenerateReportPDF,
} from "../../../src/usecases/transaction/generateReportPDF";
import { User } from "../../../src/model/user";
import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "../../../src/model/data/email";
import { Password } from "../../../src/model/data/password";
import { Interval } from "../../../src/usecases/statistics/data/Filter";
import path from "path";
import fs from "fs/promises";

jest.mock(
  "../../../src/adapters/repositories/postgresTransactionRepository.ts",
);
jest.mock("../../../src/adapters/repositories/postgresUserRepository.ts");
const server = Fastify();

describe("testes do caso de uso de gerar relatório", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("data inicial maior que final deve falhar", async () => {
    const usecase = new GenerateReportPDF(
      new PostgresTransactionRepository(),
      new PostgresUserRepository(),
    );
    const id = 0;

    await expect(usecase.generate(
      id,
      {
        initDate: new Date("2023-05-30"),
        endDate: new Date("2023-01-01"),
      },
    ))
      .rejects
      .toThrow();
  });

  test("data válida deve retornar caminho do arquivo", async () => {
    const noMoney = 0;
    const id = 0;

    const returnUser = new User({
      id,
      name: "",
      username: "test",
      isAdmin: false,
      fixedIncome: new Decimal(noMoney),
      balance: new Decimal(noMoney),
      email: new Email("test@gmail.com"),
      password: Password.fromHash(""),
    });

    mock(PostgresUserRepository).mockImplementation(() => {
      return {
        getById: async (_id: number) => returnUser,
      };
    });

    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        getByPeriod: async (_id: number, _interval: Interval) => {
          return [];
        },
      };
    });

    const usecase = new GenerateReportPDF(
      new PostgresTransactionRepository(),
      new PostgresUserRepository(),
    );

    const filePath = await usecase.generate(
      id,
      {
        initDate: new Date("2023-01-01"),
        endDate: new Date("2023-05-30"),
      },
    );

    const expectedPath = path.join(
      process.cwd(),
      "public/users/reports",
      `${returnUser.username}.pdf`,
    );

    expect(expectedPath).toBe(filePath);
    await expect(fs.stat(expectedPath))
      .resolves
      .not.toThrow();

    await fs.unlink(expectedPath);
  });
});