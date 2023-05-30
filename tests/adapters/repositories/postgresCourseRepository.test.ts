/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import {
  PostgresCourseRepository,
} from "../../../src/adapters/repositories/postgresCourseRepository";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";
import { mockDeep } from "jest-mock-extended";
import { Course } from "../../../src/model/course";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", {
  get: () => prismaMock,
});

describe("testes do repositório de cursos", () => {
  test(
    "teste de checar se um curso existe pelo id deve retornar" +
    "false caso não exista",
    async () => {
      const pg = new PostgresCourseRepository();
      const result = 0;

      prismaMock.course.count.mockImplementation(
        (_args: any) => result as any,
      );

      const id = -1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(false);
    },
  );

  test(
    "teste de checar se um curso existe pelo id deve retornar" +
    "true caso exista",
    async () => {
      const pg = new PostgresCourseRepository();
      const result = 1;

      prismaMock.course.count.mockImplementation(
        (_args: any) => result as any,
      );

      const id = 1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(true);
    },
  );

  test("teste de adicionar curso deve passar", async () => {
    const pg = new PostgresCourseRepository();

    prismaMock.course.create.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const course = new Course("", "", null, null, null, null);

    await expect(pg.add(course))
      .resolves
      .not
      .toThrow();
  });

  test("teste de remover curso deve passar", async () => {
    const pg = new PostgresCourseRepository();

    prismaMock.course.delete.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const id = 1;

    await expect(pg.remove(id))
      .resolves
      .not
      .toThrow();
  });

  test("teste de atualizar curso deve passar", async () => {
    const pg = new PostgresCourseRepository();

    prismaMock.course.update.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const id = 1;

    const course = new Course("", "", null, null, null, id);

    await expect(pg.update(course))
      .resolves
      .not
      .toThrow();
  });

  test("teste de pegar o tamanho do repositório deve passar", async () => {
    const pg = new PostgresCourseRepository();
    const result = 10;

    prismaMock.course.count.mockImplementation(
      (_args: any) => result as any,
    );

    await expect(pg.getSize())
      .resolves
      .toBe(result);
  });

  test("teste de pegar todos os cursos deve passar", async () => {
    const pg = new PostgresCourseRepository();
    const prismaCourse = [
      {
        id: 1,
        description: "desc",
        name: "name",
      },
    ];

    prismaMock.course.findMany.mockImplementation(
      (_args: any) => prismaCourse as any,
    );

    const aggregateResult = 600;

    prismaMock.lesson.aggregate.mockImplementation(
      (_args: any) => {
        return {
          _avg: {
            duration_sec: aggregateResult,
          },
          _sum: {
            duration_sec: aggregateResult,
          },
        } as any;
      },
    );

    const howManyLessons = 1;

    prismaMock.lesson.count.mockImplementation(
      (_args: any) => howManyLessons as any,
    );

    const page = 1;
    const size = 10;

    await expect(pg.getAll(page, size))
      .resolves
      .toEqual([
        {
          id: 1,
          description: "desc",
          averageTimePerLesson: 10,
          howManyLessons: 1,
          title: "name",
          totalTime: 10,
        } as Course,
      ]);
  });
});