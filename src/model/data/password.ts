import { Hash } from "../../adapters/services/hash";

export class Password {
  private readonly password: string;

  constructor(password: string) {
    this.password = Hash.hash(password);
  }

  get value(): string {
    return this.password;
  }
}