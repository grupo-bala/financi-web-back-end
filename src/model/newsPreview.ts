export class NewsPreview {
  readonly id: number;
  readonly img: string;
  readonly title: string;
  readonly publishDate: Date;

  constructor(id: number, title: string, img: string, publishDate: Date) {
    this.id = id;
    this.title = title;
    this.img = img;
    this.publishDate = publishDate;
  }
}