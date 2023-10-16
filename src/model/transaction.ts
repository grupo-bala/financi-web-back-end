import { Decimal } from "@prisma/client/runtime/library";

export class Transaction {
  readonly value: Decimal;
  readonly categoryId: number;
  readonly title: string;
  readonly isEntry: boolean;
  readonly date: Date;
  readonly userId: number | null;
  readonly id: number | null;

  constructor(
    value: Decimal,
    categoryId: number,
    title: string,
    isEntry: boolean,
    date: Date,
    userId: number | null,
    id: number | null,
  ) {
    this.value = value;
    this.categoryId = categoryId;
    this.title = title;
    this.isEntry = isEntry;
    this.date = date;
    this.id = id;
    this.userId = userId;
  }
}