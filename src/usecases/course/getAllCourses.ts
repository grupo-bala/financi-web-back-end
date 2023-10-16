import { Course } from "../../model/course";
import { CourseRepository } from "./interface/courseRepository";

export class GetAllCourses {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async getAll(page: number, size: number): Promise<{
    courses: Course[],
    howManyPages: number
  }> {
    const negativeOrZero = 0;

    if (page <= negativeOrZero) {
      throw new Error("A página deve ser um número positivo maior que zero");
    } else if (size <= negativeOrZero) {
      throw new Error("O tamanho deve ser um número positivo maior que zero");
    }

    const repositorySize = await this.courseRepository.getSize();
    const empty = 0;

    if (repositorySize === empty) {
      return {
        courses: [],
        howManyPages: 0,
      };
    }

    const repositoryCourses = await this
      .courseRepository
      .getAll(page, size);

    return {
      courses: repositoryCourses,
      howManyPages: Math.ceil(repositorySize / size),
    };
  }
}