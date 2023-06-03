import { Lesson } from "../../../model/lesson";
import { LessonPreview } from "../../../model/lessonPreview";

export interface LessonRepository {
  add(lesson: Lesson): Promise<void>;
  existsInCourse(name: string, courseId: number): Promise<boolean>;
  existsInCourseById(id: number, courseId: number): Promise<boolean>;
  remove(id: number): Promise<void>;
  update(lesson: Lesson): Promise<void>;
  getAll(
    userId: number,
    page: number,
    size: number,
    courseId: number
  ): Promise<LessonPreview[]>;
  get(userId: number, id: number): Promise<Lesson>;
  getSize(courseId: number): Promise<number>;
  updateWatchedStatus(
    status: boolean, userId: number, id: number
  ): Promise<void>;
  isWatched(userId: number, id: number): Promise<boolean>;
}