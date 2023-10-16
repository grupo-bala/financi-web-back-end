export class News {
  readonly author: string;
  readonly title: string;
  readonly summary: string;
  readonly content: string;
  readonly imgURL: string;
  readonly recommended: boolean;
  readonly id: number | null;
  readonly publishDate: Date | null;
  readonly lastUpdateDate: Date | null;

  constructor(
    author: string,
    title: string,
    summary: string,
    content: string,
    imgURL: string,
    recommended: boolean,
    publishDate: Date | null,
    lastUpdateDate: Date | null,
    id: number | null,
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.summary = summary;
    this.content = content;
    this.recommended = recommended;
    this.publishDate = publishDate;
    this.lastUpdateDate = lastUpdateDate;
    this.imgURL = imgURL;
  }
}