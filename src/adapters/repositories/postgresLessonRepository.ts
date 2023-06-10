import { Lesson } from "../../model/lesson";
import { LessonPreview } from "../../model/lessonPreview";
import { LessonRepository } from "../../usecases/lesson/interfaces/lessonRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresLessonRepository implements LessonRepository {
  async isWatched(userId: number, id: number): Promise<boolean> {
    const watchedLessonQuery = await PrismaHelper
      .client
      .viewed_lesson
      .count({
        where: {
          id_user: userId,
          id_lesson: id,
        },
      });

    const empty = 0;

    return watchedLessonQuery !== empty;
  }

  async updateWatchedStatus(
    status: boolean, userId: number, id: number,
  ): Promise<void> {
    if (status) {
      await PrismaHelper
        .client
        .viewed_lesson
        .create({
          data: {
            id_lesson: id,
            id_user: userId,
          },
        });
    } else {
      const { id: recordId } = await PrismaHelper
        .client
        .viewed_lesson
        .findFirstOrThrow({
          where: {
            id_lesson: id,
            id_user: userId,
          },
        });

      await PrismaHelper
        .client
        .viewed_lesson
        .delete({
          where: {
            id: recordId,
          },
        });
    }
  }

  async getSize(courseId: number): Promise<number> {
    return await PrismaHelper
      .client
      .lesson
      .count({
        where: {
          id_course: courseId,
        },
      });
  }

  async existsInCourseById(id: number, courseId: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .lesson
      .count({
        where: {
          id_course: courseId,
          id,
        },
      });

    const empty = 0;

    return count > empty;
  }

  async remove(id: number): Promise<void> {
    await PrismaHelper
      .client
      .lesson
      .delete({
        where: {
          id,
        },
      });
  }

  async update(lesson: Lesson): Promise<void> {
    await PrismaHelper
      .client
      .lesson
      .update({
        data: {
          id_course: lesson.courseId,
          duration_sec: lesson.durationSecs,
          name: lesson.name,
          video_url: lesson.videoURL,
        },
        where: {
          id: lesson.id!,
        },
      });
  }

  async getAll(
    userId: number,
    page: number,
    size: number,
    courseId: number,
  ): Promise<LessonPreview[]> {
    const prismaLessons = await PrismaHelper
      .client
      .lesson
      .findMany({
        skip: --page * size,
        take: size,
        where: {
          id_course: courseId,
        },
        orderBy: {
          id: "asc",
        },
      });

    const lessonsPreview: LessonPreview[] = [];

    for (const {
      duration_sec: durationSecs,
      id,
      name,
    } of prismaLessons) {
      lessonsPreview.push({
        id,
        title: name,
        isWatched: await this.isWatched(userId, id),
        time: durationSecs,
      });
    }

    return lessonsPreview;
  }

  async get(userId: number, id: number): Promise<Lesson> {
    const {
      duration_sec: durationSecs,
      id_course: courseId,
      name,
      video_url: videoURL,
    } = await PrismaHelper
      .client
      .lesson
      .findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

    return {
      courseId,
      durationSecs,
      id: userId,
      name,
      videoURL,
      viewedLesson: await this.isWatched(userId, id),
    };
  }

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