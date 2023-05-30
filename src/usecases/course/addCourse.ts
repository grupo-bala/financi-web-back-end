import { Course } from "../../model/course";
import { CourseRepository } from "./interface/courseRepository";

export class AddCourse {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async add(course: Course): Promise<void> {
    await this.courseRepository.add(course);
  }
}