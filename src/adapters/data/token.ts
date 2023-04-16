import jwt from "jsonwebtoken";

export class Token {
  private readonly username: string;
  private readonly isAdmin: boolean;
  private readonly encoded: string;

  constructor(username: string, isAdmin: boolean) {
    this.username = username;
    this.isAdmin = isAdmin;
    this.encoded = this.encode();
  }

  private encode(): string {
    return jwt.sign({
      sub: this.username,
      adm: this.isAdmin,
      exp: 100000
    }, process.env.SECRET_KEY!);
  }

  get value(): string {
    return this.encoded;
  }
}