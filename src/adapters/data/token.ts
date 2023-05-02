import jwt from "jsonwebtoken";
import { EnviromentVars } from "../../server/config/enviromentVars";

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
    const millisecondsInSecond = 1000;
    const oneMinute = 60;
    const oneHour = oneMinute * oneMinute;

    const expirationTime = Math.floor(
      Date.now() / millisecondsInSecond,
    ) + oneHour;

    const jwtToken = jwt.sign({
      sub: username,
      adm: isAdmin,
      exp: expirationTime,
    }, EnviromentVars.vars.SECRET_KEY);

    return new Token(username, isAdmin, jwtToken);
  }

  static decode(token: string): Token {
    try {
      const payload = jwt.verify(token, EnviromentVars.vars.SECRET_KEY) as jwt;
      return new Token(payload.sub, payload.adm, token);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}