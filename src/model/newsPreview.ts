export class NewsPreview {
  readonly id: number;
  readonly imgURL: string;
  readonly title: string;
  readonly publishDate: Date;

  constructor(id: number, title: string, imgURL: string, publishDate: Date) {
    this.id = id;
    this.title = title;
    this.imgURL = imgURL;
    this.publishDate = publishDate;
  }
}