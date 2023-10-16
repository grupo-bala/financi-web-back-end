import { Course } from "../../model/course";
import { CourseRepository } from "../../usecases/course/interface/courseRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresCourseRepository implements CourseRepository {
  async existsById(id: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .course
      .count({
        where: {
          id,
        },
      });

    const empty = 0;

    return count > empty;
  }

  async add(course: Course): Promise<void> {
    await PrismaHelper
      .client
      .course
      .create({
        data: {
          description: course.description,
          name: course.title,
        },
      });
  }

  async get(id: number): Promise<Course> {
    const course = await PrismaHelper
      .client
      .course
      .findFirst({
        where: {
          id,
        },
      });

    const howManyLessons = await PrismaHelper
      .client
      .lesson
      .count({
        where: {
          id_course: id,
        },
      });

    const aggregation = await PrismaHelper
      .client
      .lesson
      .aggregate({
        _avg: {
          duration_sec: true,
        },
        _sum: {
          duration_sec: true,
        },
        where: {
          id_course: id,
        },
      });

    const emptyCourseTime = 0;

    const averageTimePerLessonInSeconds = aggregation
      ._avg
      .duration_sec ?? emptyCourseTime;

    const totalTimeInSeconds = aggregation
      ._sum
      .duration_sec ?? emptyCourseTime;

    return new Course(
      course!.name,
      course!.description,
      howManyLessons,
      Math.ceil(averageTimePerLessonInSeconds),
      totalTimeInSeconds,
      course!.id,
    );
  }

  async getAll(page: number, size: number): Promise<Course[]> {
    const prismaCourses = await PrismaHelper
      .client
      .course
      .findMany({
        skip: --page * size,
        take: size,
        orderBy: {
          id: "asc",
        },
      });

    const courses: Course[] = [];

    for (
      const {
        description,
        id,
        name,
      } of prismaCourses
    ) {
      const howManyLessons = await PrismaHelper
        .client
        .lesson
        .count({
          where: {
            id_course: id,
          },
        });

      const aggregation = await PrismaHelper
        .client
        .lesson
        .aggregate({
          _avg: {
            duration_sec: true,
          },
          _sum: {
            duration_sec: true,
          },
          where: {
            id_course: id,
          },
        });

      const emptyCourseTime = 0;

      const averageTimePerLessonInSeconds = aggregation
        ._avg
        .duration_sec ?? emptyCourseTime;

      const totalTimeInSeconds = aggregation
        ._sum
        .duration_sec ?? emptyCourseTime;

      courses.push({
        description,
        id,
        title: name,
        averageTimePerLesson: averageTimePerLessonInSeconds,
        howManyLessons,
        totalTime: totalTimeInSeconds,
      });
    }

    return courses;
  }

  async remove(id: number): Promise<void> {
    await PrismaHelper
      .client
      .course
      .delete({
        where: {
          id,
        },
      });
  }

  async update(course: Course): Promise<void> {
    await PrismaHelper
      .client
      .course
      .update({
        where: {
          id: course.id!,
        },
        data: {
          description: course.description,
          name: course.title,
        },
      });
  }

  async getSize(): Promise<number> {
    return await PrismaHelper
      .client
      .course
      .count();
  }
}