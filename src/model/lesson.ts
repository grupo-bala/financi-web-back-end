export class Lesson {
  readonly id: number;
  readonly videoURL: string;
  readonly durationSecs: number;
  readonly courseId: number;
  readonly name: string;

  constructor({
    id, videoURL, durationSecs, courseId, name,
  }: {
    id: number,
    videoURL: string,
    durationSecs: number,
    courseId: number,
    name: string,
  }) {
    this.id = id;
    this.videoURL = videoURL;
    this.durationSecs = durationSecs;
    this.courseId = courseId;
    this.name = name;
  }
}