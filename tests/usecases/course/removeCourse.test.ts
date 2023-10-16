/* eslint-disable @typescript-eslint/no-empty-function */
import { PostgresCourseRepository } from "../../../src/adapters/repositories/postgresCourseRepository";
import { mock } from "../../util";
import {
  RemoveCourse,
} from "../../../src/usecases/course/removeCourse";

jest.mock("../../../src/adapters/repositories/postgresCourseRepository");

describe("testes de remover um curso", () => {
  test("teste deve falhar, pois id não existe", async () => {
    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const removeCourse = new RemoveCourse(
      new PostgresCourseRepository(),
    );

    const id = -1;

    await expect(removeCourse.remove(id))
      .rejects
      .toThrow(Error);
  });

  test("caso de uso sem erros deve passar sem problemas", async () => {
    mock(PostgresCourseRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        remove: async (_: number) => {},
      };
    });

    const removeCourse = new RemoveCourse(
      new PostgresCourseRepository(),
    );

    const id = 1;

    await expect(removeCourse.remove(id))
      .resolves
      .not
      .toThrow();
  });
});