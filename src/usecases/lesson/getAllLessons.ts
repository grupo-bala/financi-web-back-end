import { LessonPreview } from "../../model/lessonPreview";
import { CourseRepository } from "../course/interface/courseRepository";
import { LessonRepository } from "./interfaces/lessonRepository";

export class GetAllLessons {
  private readonly lessonRepository: LessonRepository;
  private readonly courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async getAll(
    userId: number,
    page: number,
    size: number,
    courseId: number,
  ): Promise<{lessons: LessonPreview[], howManyPages: number}> {
    const negativeOrZero = 0;

    if (page <= negativeOrZero) {
      throw new Error("A página deve ser um número positivo maior que zero");
    } else if (size <= negativeOrZero) {
      throw new Error("O tamanho deve ser um número positivo maior que zero");
    } else if (!await this.courseRepository.existsById(courseId)) {
      throw new Error("Esse curso não existe");
    }

    const repositorySize = await this.lessonRepository.getSize(courseId);
    const empty = 0;

    if (repositorySize === empty) {
      return {
        lessons: [],
        howManyPages: 0,
      };
    }

    const lessons = await this
      .lessonRepository.getAll(userId, page, size, courseId);

    return {
      lessons,
      howManyPages: Math.ceil(repositorySize / size),
    };
  }
}