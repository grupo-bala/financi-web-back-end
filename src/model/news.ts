export class News {
  readonly id?: number;
  readonly author: string;
  readonly title: string;
  readonly summary: string;
  readonly content: string;
  readonly publishDate: Date;
  readonly lastUpdateDate: Date | null;
  readonly imgURL: string;

  constructor(
    author: string,
    title: string,
    summary: string,
    content: string,
    publishDate: Date,
    imgURL: string,
    lastUpdateDate: Date | null,
    id?: number,
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.summary = summary;
    this.content = content;
    this.publishDate = publishDate;
    this.lastUpdateDate = lastUpdateDate;
    this.imgURL = imgURL;
  }
}