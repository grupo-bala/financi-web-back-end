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
  test(
    "pegar todas as categorias deve ser executado sem problemas",
    async () => {
      const pg = new PostgresCategoryRepository();

      prismaMock.category.findMany.mockImplementation(
        (_args: any) => [] as any,
      );

      await expect(pg.getAll()).resolves.toBeInstanceOf(Array);
    },
  );

  test(
    "checar se uma categoria existe deve retornar falso caso não exista",
    async () => {
      const pg = new PostgresCategoryRepository();
      const count = 0;

      prismaMock.category.count.mockImplementation(
        (_args: any) => count as any,
      );

      const id = 1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(false);
    },
  );

  test(
    "checar se uma categoria existe deve retornar true caso ela exista",
    async () => {
      const pg = new PostgresCategoryRepository();
      const count = 1;

      prismaMock.category.count.mockImplementation(
        (_args: any) => count as any,
      );

      const id = 1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(true);
    },
  );
});