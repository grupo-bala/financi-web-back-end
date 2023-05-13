/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import {
  PostgresCategoryRepository,
} from "../../../src/adapters/repositories/postgresCategoryRepository";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";
import { mockDeep } from "jest-mock-extended";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", {
  get: () => prismaMock,
});

describe("testes do repositório de categorias", () => {
  test("caso de uso deve ser executado sem problemas", async () => {
    const pg = new PostgresCategoryRepository();

    prismaMock.category.findMany.mockImplementation(
      (_args: any) => [] as any,
    );

    await expect(pg.getAll()).resolves.toBeInstanceOf(Array);
  });
});