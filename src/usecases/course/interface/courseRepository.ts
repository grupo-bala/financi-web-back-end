import { Course } from "../../../model/course";

export interface CourseRepository {
  existsById: (id: number) => Promise<boolean>;
  add: (course: Course) => Promise<void>;
  getAll: (page: number, size: number) => Promise<Course[]>;
  remove: (id: number) => Promise<void>;
  update: (course: Course) => Promise<void>;
  getSize: () => Promise<number>;
}