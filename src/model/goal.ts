import { Decimal } from "@prisma/client/runtime/library";

export class Goal {
  readonly id: number;
  readonly title: string;
  readonly userId: number;
  readonly totalValue: Decimal;
  readonly currentValue: Decimal;
  readonly idealPerMonth: Decimal;
  readonly deadline: Date;

  constructor({
    id,
    title,
    userId,
    totalValue,
    currentValue,
    deadline,
    idealPerMonth,
  }: {
    id: number,
    title: string,
    userId: number,
    totalValue: Decimal,
    currentValue: Decimal,
    deadline: Date,
    idealPerMonth: Decimal,
  }) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.totalValue = totalValue;
    this.currentValue = currentValue;
    this.deadline = deadline;
    this.idealPerMonth = idealPerMonth;
  }
}