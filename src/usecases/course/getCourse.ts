import { CourseRepository } from "./interface/courseRepository";

export class GetCourse {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async get(courseId: number) {
    if (!await this.courseRepository.existsById(courseId)) {
      throw new Error("Esse curso não existe");
    }

    return await this.courseRepository.get(courseId);
  }
}