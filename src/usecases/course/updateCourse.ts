import { Course } from "../../model/course";
import { CourseRepository } from "./interface/courseRepository";

export class UpdateCourse {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async update(course: Course): Promise<void> {
    if (!await this.courseRepository.existsById(course.id!)) {
      throw new Error("Esse curso não existe");
    }

    await this.courseRepository.update(course);
  }
}