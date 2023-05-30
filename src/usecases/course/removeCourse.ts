import { CourseRepository } from "./interface/courseRepository";

export class RemoveCourse {
  private readonly courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async remove(id: number): Promise<void> {
    if (!await this.courseRepository.existsById(id)) {
      throw new Error("Esse curso não existe");
    }

    await this.courseRepository.remove(id);
  }
}