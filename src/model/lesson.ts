export class Lesson {
  readonly videoURL: string;
  readonly durationSecs: number;
  readonly courseId: number;
  readonly name: string;
  readonly viewedLesson: boolean | null;
  readonly id: number | null;

  constructor({
    videoURL, durationSecs, courseId, name, id, viewedLesson,
  }: {
    id: number | null,
    videoURL: string,
    durationSecs: number,
    courseId: number,
    name: string,
    viewedLesson: boolean | null,
  }) {
    this.id = id;
    this.videoURL = videoURL;
    this.durationSecs = durationSecs;
    this.courseId = courseId;
    this.name = name;
    this.viewedLesson = viewedLesson;
  }
}