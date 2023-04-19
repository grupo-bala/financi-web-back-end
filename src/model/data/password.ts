import { Hash } from "../../adapters/services/hash";

export class Password {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  static fromString(password: string): Password {
    return new Password(Hash.hash(password));
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  get value(): string {
    return this.password;
  }
}