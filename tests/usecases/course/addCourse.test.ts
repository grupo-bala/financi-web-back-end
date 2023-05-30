/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresCourseRepository,
} from "../../../src/adapters/repositories/postgresCourseRepository";
import {
  AddCourse,
} from "../../../src/usecases/course/addCourse";
import { Course } from "../../../src/model/course";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresCourseRepository");

describe("testes de adicionar cursos", () => {
  test("caso de uso sem erros deve passar sem problemas", async () => {
    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        add: async (_: Course) => {},
      };
    });

    const newCourse = new Course("", "", null, null, null);

    const addCourse = new AddCourse(
      new PostgresCourseRepository(),
    );

    await expect(addCourse.add(newCourse))
      .resolves
      .not
      .toThrow();
  });
});