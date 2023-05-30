import { Lesson } from "../../../model/lesson";

export interface LessonRepository {
  add(lesson: Lesson): Promise<void>;
  existsInCourse(name: string, courseId: number): Promise<boolean>;
}