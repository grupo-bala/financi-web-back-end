import { Lesson } from "../../model/lesson";
import { LessonRepository } from "../../usecases/lesson/interfaces/lessonRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresLessonRepository implements LessonRepository {
  async add({
    courseId,
    name,
    durationSecs,
    videoURL,
  }: Lesson): Promise<void> {
    await PrismaHelper
      .client
      .lesson
      .create({
        data: {
          name,
          duration_sec: durationSecs,
          video_url: videoURL,
          id_course: courseId,
        },
      });
  }

  async existsInCourse(name: string, courseId: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .lesson
      .count({
        where: {
          name,
          id_course: courseId,
        },
      });

    const empty = 0;
    return count !== empty;
  }

}