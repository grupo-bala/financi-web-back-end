import jwt from "jsonwebtoken";

type jwt = {
  sub: string,
  adm: boolean,
  exp: number
};

export class Token {
  readonly username: string;
  readonly isAdmin: boolean;
  readonly encoded: string;

  private constructor(username: string, isAdmin: boolean, encoded: string) {
    this.username = username;
    this.isAdmin = isAdmin;
    this.encoded = encoded;
  }

  static encode(username: string, isAdmin: boolean): Token {
    const oneHour = Math.floor(Date.now() / 1000) + (60 * 60);
    const jwtToken = jwt.sign({
      sub: username,
      adm: isAdmin,
      exp: oneHour
    }, process.env.SECRET_KEY!);

    return new Token(username, isAdmin, jwtToken);
  }

  static decode(token: string): Token {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY!) as jwt;
      return new Token(payload.sub, payload.adm, token);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}