import {
  PostgresCourseRepository,
} from "../../../src/adapters/repositories/postgresCourseRepository";
import {
  GetAllCourses,
} from "../../../src/usecases/course/getAllCourses";
import { Course } from "../../../src/model/course";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresCourseRepository");

describe("testes de pegar todos os cursos", () => {
  test("deve falhar, pois o size é negativo ou igual a zero", async () => {
    const getAllCourses = new GetAllCourses(
      new PostgresCourseRepository(),
    );
    const page = 1;
    const size = -1;

    await expect(getAllCourses.getAll(page, size))
      .rejects
      .toThrow("O tamanho deve ser um número positivo maior que zero");
  });

  test("deve falhar, pois a página é negativa ou igual a zero", async () => {
    const getAllCourses = new GetAllCourses(
      new PostgresCourseRepository(),
    );
    const page = -1;
    const size = 10;

    await expect(getAllCourses.getAll(page, size))
      .rejects
      .toThrow("A página deve ser um número positivo maior que zero");
  });

  test(
    "deve passar com array preenchido, caso tenha cursos no repositório",
    async () => {
      const repositorySize = 1;
      const howManyLessons = 1;
      const avgTime = 30;
      const totalTime = 30;
      const id = 1;
      const course = new Course("", "", howManyLessons, avgTime, totalTime, id);

      mock(PostgresCourseRepository).mockImplementation(() => {
        return {
          getSize: async () => repositorySize,
          getAll: async (_: number, __: number) => [course],
        };
      });

      const getAllCourses = new GetAllCourses(
        new PostgresCourseRepository(),
      );
      const page = 1;
      const size = 10;

      await expect(getAllCourses.getAll(page, size))
        .resolves
        .toEqual({
          courses: [course],
          howManyPages: 1,
        });
    },
  );

  test("deve passar com array vazio, caso não tenha cursos", async () => {
    const empty = 0;

    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        getSize: async () => empty,
      };
    });

    const getAllCourses = new GetAllCourses(
      new PostgresCourseRepository(),
    );
    const page = 1;
    const size = 10;

    await expect(getAllCourses.getAll(page, size))
      .resolves
      .toEqual({
        courses: [],
        howManyPages: 0,
      });
  });
});