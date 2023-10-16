/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresCourseRepository,
} from "../../../src/adapters/repositories/postgresCourseRepository";
import { mock } from "../../util";
import {
  UpdateCourse,
} from "../../../src/usecases/course/updateCourse";
import { Course } from "../../../src/model/course";

jest.mock("../../../src/adapters/repositories/postgresCourseRepository");

describe("testes de atualizar um curso", () => {
  test("teste deve falhar, pois id não existe", async () => {
    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const updateCourse = new UpdateCourse(
      new PostgresCourseRepository(),
    );

    const id = -1;
    const course = new Course("", "", null, null, null, id);

    await expect(updateCourse.update(course))
      .rejects
      .toThrow(Error);
  });

  test("caso de uso sem erros deve passar sem problemas", async () => {
    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        update: async (_: Course) => {},
      };
    });

    const updateCourse = new UpdateCourse(
      new PostgresCourseRepository(),
    );

    const id = 1;
    const course = new Course("", "", null, null, null, id);

    await expect(updateCourse.update(course))
      .resolves
      .not
      .toThrow();
  });
});