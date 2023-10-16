import { Decimal } from "@prisma/client/runtime/library";

export class TransactionPreview {
  readonly value: Decimal;
  readonly categoryId: number;
  readonly title: string;
  readonly isEntry: boolean;
  readonly date: Date;
  readonly id: number;

  constructor(
    value: Decimal,
    categoryId: number,
    title: string,
    isEntry: boolean,
    date: Date,
    id: number,
  ) {
    this.value = value;
    this.categoryId = categoryId;
    this.title = title;
    this.isEntry = isEntry;
    this.date = date;
    this.id = id;
  }
}