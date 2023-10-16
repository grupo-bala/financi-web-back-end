export class NewsPreview {
  readonly id: number;
  readonly imgURL: string;
  readonly title: string;
  readonly publishDate: Date;
  readonly recommended: boolean;

  constructor(
    id: number,
    title: string,
    imgURL: string,
    publishDate: Date,
    recommended: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.imgURL = imgURL;
    this.publishDate = publishDate;
    this.recommended = recommended;
  }
}