import { Lesson } from "../../model/lesson";
import { CourseRepository } from "../course/interface/courseRepository";
import { LessonRepository } from "./interfaces/lessonRepository";

export class AddLesson {
  readonly lessonsRepository: LessonRepository;
  readonly courseRepository: CourseRepository;

  constructor(
    lessonsRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonsRepository = lessonsRepository;
    this.courseRepository = courseRepository;
  }

  async add(lesson: Lesson) {
    if (await this.lessonsRepository.existsInCourse(
      lesson.name,
      lesson.courseId,
    )) {
      throw new Error("Uma aula com esse nome já existe nesse curso");
    }

    if (!await this.courseRepository.existsById(lesson.courseId)) {
      throw new Error("Esse curso não existe");
    }

    await this.lessonsRepository.add(lesson);
  }
}