import { Lesson } from "../../model/lesson";
import { CourseRepository } from "../course/interface/courseRepository";
import { LessonRepository } from "./interfaces/lessonRepository";

export class UpdateLesson {
  private readonly lessonRepository: LessonRepository;
  private readonly courseRepository: CourseRepository;

  constructor(
    lessonRepository: LessonRepository,
    courseRepository: CourseRepository,
  ) {
    this.lessonRepository = lessonRepository;
    this.courseRepository = courseRepository;
  }

  async update(lesson: Lesson): Promise<void> {
    if (!await this.courseRepository.existsById(lesson.courseId)) {
      throw new Error("Esse curso não existe");
    } else if (await this.lessonRepository.existsInCourse(
      lesson.name,
      lesson.courseId,
    )) {
      throw new Error("Uma aula com esse nome já existe nesse curso");
    } else if (
      !await this.lessonRepository.existsInCourseById(
        lesson.id!,
        lesson.courseId,
      )
    ) {
      throw new Error("Essa aula não existe nesse curso");
    }

    await this.lessonRepository.update(lesson);
  }
}