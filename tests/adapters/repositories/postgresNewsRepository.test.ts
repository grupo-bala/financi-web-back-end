/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";
import {
  PostgresNewsRepository,
} from "../../../src/adapters/repositories/postgresNewsRepository";
import { News } from "../../../src/model/news";
import { NewsPreview } from "../../../src/model/newsPreview";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", {
  get: () => prismaMock,
});

describe("testes do repositório de notícias", () => {
  test("título buscado no banco existe e retorna verdadeiro", async () => {
    const pg = new PostgresNewsRepository();
    const count = 1;

    prismaMock.news.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsByTitle("Test")).resolves.toBeTruthy();
  });

  test("título buscado no banco não existe e retorna falso", async () => {
    const pg = new PostgresNewsRepository();
    const count = 0;

    prismaMock.news.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsByTitle("Test")).resolves.toBeFalsy();
  });

  test("id buscado no banco existe e retorna verdadeiro", async () => {
    const pg = new PostgresNewsRepository();
    const count = 1;

    prismaMock.news.count.mockImplementation(
      (_args: any) => count as any,
    );

    const id = 1;

    await expect(pg.existsById(id)).resolves.toBeTruthy();
  });

  test("id buscado no banco não existe e retorna falso", async () => {
    const pg = new PostgresNewsRepository();
    const count = 0;

    prismaMock.news.count.mockImplementation(
      (_args: any) => count as any,
    );

    const id = -1;

    await expect(pg.existsById(id)).resolves.toBeFalsy();
  });

  test(
    "remover uma notícia no banco deve passar se o id existir",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.delete.mockImplementation(
        (_args: any) => ({}) as any,
      );

      const idThatExists = 1;

      await expect(
        pg.remove(idThatExists),
      ).resolves.not.toThrow();
    },
  );

  test(
    "remover uma notícia no banco deve soltar ume exceção caso o id não existe",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.delete.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      const idThatNotExists = 1;

      await expect(
        pg.remove(idThatNotExists),
      ).rejects.toThrow();
    },
  );

  test("pegar a quantidade de notícias deve passar", async () => {
    const pg = new PostgresNewsRepository();
    const countResult = 10;

    prismaMock.news.count.mockImplementation(
      (_args: any) => countResult as any,
    );

    await expect(
      pg.getSize(),
    ).resolves.not.toThrow();
  });

  test("pegar uma notícia do banco deve passar caso o id exista", async () => {
    const pg = new PostgresNewsRepository();
    const id = 1;
    const news = new News(
      "",
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      id,
    );

    prismaMock.news.findUniqueOrThrow.mockImplementation(
      (_args: any) => {
        return {
          author: "",
          content: "",
          id,
          img_url: "",
          last_update_date: news.lastUpdateDate,
          publish_date: news.publishDate,
          summary: "",
          title: "",
        } as any;
      },
    );

    await expect(pg.get(id))
      .resolves
      .toEqual(news);
  });

  test(
    "pegar uma notícia do banco deve soltar uma exceção caso o id não exista",
    async () => {
      const pg = new PostgresNewsRepository();
      const id = -1;

      prismaMock.news.findUniqueOrThrow.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      await expect(pg.get(id))
        .rejects
        .toThrow();
    },
  );

  test(
    "adicionar uma notícia no banco deve passar caso o título não exista",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.create.mockImplementation(
        (_args: any) => ({}) as any,
      );

      const id = 1;
      const news = new News(
        "",
        "",
        "",
        "",
        "",
        new Date(),
        new Date(),
        id,
      );

      await expect(pg.add(news))
        .resolves
        .not
        .toThrow();
    },
  );

  test(
    "adicionar uma notícia com um título repetido deve falhar",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.create.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      const id = 1;
      const news = new News(
        "",
        "",
        "",
        "",
        "",
        new Date(),
        new Date(),
        id,
      );

      await expect(pg.add(news))
        .rejects
        .toThrow();
    },
  );

  test(
    "atualizar uma notícia deve passar caso o título seja único",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.update.mockImplementation(
        (_args: any) => ({}) as any,
      );

      const id = 1;
      const news = new News(
        "",
        "",
        "",
        "",
        "",
        new Date(),
        new Date(),
        id,
      );

      await expect(pg.update(news))
        .resolves
        .not
        .toThrow();
    },
  );

  test(
    "atualizar uma notícia deve falhar caso o título já exista",
    async () => {
      const pg = new PostgresNewsRepository();

      prismaMock.news.update.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      const id = 1;
      const news = new News(
        "",
        "",
        "",
        "",
        "",
        new Date(),
        new Date(),
        id,
      );

      await expect(pg.update(news))
        .rejects
        .toThrow();
    },
  );

  test(
    "Pegar o preview de notícias deve passar",
    async () => {
      const pg = new PostgresNewsRepository();
      const id = 1;
      const prismaPreviews = [
        {
          img_url: "",
          publish_date: new Date(),
          title: "",
          id: id,
        },
      ];
      const news = [
        new NewsPreview(
          id,
          "",
          "",
          prismaPreviews[0].publish_date,
        ),
      ];

      prismaMock.news.findMany.mockImplementation(
        (_args: any) => prismaPreviews as any,
      );

      const page = 1;
      const size = 10;

      await expect(pg.getAllPreviews(page, size))
        .resolves
        .toEqual(news);
    },
  );
});