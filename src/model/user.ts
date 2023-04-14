import { Decimal } from "@prisma/client/runtime/library";
import { Email } from "./data/email";
import { Password } from "./data/password";

export class User {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly fixedIncome: Decimal;
  readonly balance: Decimal;
  readonly email: Email;
  readonly password: Password;

  constructor(
    id: number,
    name: string,
    username: string,
    fixedIncome: Decimal,
    balance: Decimal,
    email: Email,
    password: Password
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.fixedIncome = fixedIncome;
    this.balance = balance;
    this.email = email;
    this.password = password;
  }
}
