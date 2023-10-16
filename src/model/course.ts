export class Course {
  readonly title: string;
  readonly description: string;
  readonly id: number | null;
  readonly howManyLessons: number | null;
  readonly averageTimePerLesson: number | null;
  readonly totalTime: number | null;

  constructor(
    title: string,
    description: string,
    howManyLessons: number | null,
    avarageTimePerLesson: number | null,
    totalTime: number | null,
    id: number | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.howManyLessons = howManyLessons;
    this.averageTimePerLesson = avarageTimePerLesson;
    this.totalTime = totalTime;
  }
}