import { Lesson } from "../../model/lesson";
import { CourseRepository } from "../course/interface/courseRepository";
import { LessonRepository } from "./interfaces/lessonRepository";

export class GetLesson {
  private readonly lessonRepository: LessonRepository;
  private readonly courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async get(userId: number, id: number, courseId: number): Promise<Lesson> {
    if (!await this.courseRepository.existsById(courseId)) {
      throw new Error("Esse curso não existe");
    } else if (!await this.lessonRepository.existsInCourseById(id, courseId)) {
      throw new Error("Essa aula não existe nesse curso");
    }

    return await this.lessonRepository.get(userId, id);
  }
}