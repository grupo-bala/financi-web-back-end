import { CourseRepository } from "../course/interface/courseRepository";
import { LessonRepository } from "./interfaces/lessonRepository";

export class UpdateLessonWatchedStatus {
  private readonly lessonRepository: LessonRepository;
  private readonly courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async updateWatchedStatus(
    status: boolean, userId: number, id: number, courseId: number,
  ) {
    if (!await this.courseRepository.existsById(courseId)) {
      throw new Error("Esse curso não existe");
    } else if (!await this.lessonRepository.existsInCourseById(id, courseId)) {
      throw new Error("Essa aula não existe nesse curso");
    }

    const currentWatchedStatus = await this
      .lessonRepository.isWatched(userId, id);

    if (currentWatchedStatus === status) {
      throw new Error("A aula já possui esse status de visualização");
    }

    await this.lessonRepository.updateWatchedStatus(status, userId, id);
  }
}