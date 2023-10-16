export class LessonPreview {
  readonly title: string;
  readonly time: number;
  readonly isWatched: boolean;
  readonly id: number;

  constructor(id: number, title: string, time: number, isWatched: boolean) {
    this.time = time;
    this.title = title;
    this.isWatched = isWatched;
    this.id = id;
  }
}