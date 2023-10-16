import jwt from "jsonwebtoken";
import { EnviromentVars } from "../../server/config/enviromentVars";

type jwt = {
  sub: string,
  adm: boolean,
  exp: number
};

export class Token {
  readonly id: number;
  readonly isAdmin: boolean;
  readonly expirationTime: number;
  readonly encoded: string;

  private constructor(
    id: number,
    isAdmin: boolean,
    expirationTime: number,
    encoded: string,
  ) {
    this.id = id;
    this.isAdmin = isAdmin;
    this.expirationTime = expirationTime;
    this.encoded = encoded;
  }

  static encode(id: number, isAdmin: boolean): Token {
    const millisecondsInSecond = 1000;
    const oneMinute = 60;
    const oneHour = oneMinute * oneMinute;

    const expirationTime = Math.floor(
      Date.now() / millisecondsInSecond,
    ) + oneHour;

    const jwtToken = jwt.sign({
      sub: id,
      adm: isAdmin,
      exp: expirationTime,
    }, EnviromentVars.vars.SECRET_KEY);

    return new Token(id, isAdmin, expirationTime, jwtToken);
  }

  static decode(token: string): Token {
    try {
      const payload = jwt.verify(token, EnviromentVars.vars.SECRET_KEY) as jwt;
      return new Token(Number(payload.sub), payload.adm, payload.exp, token);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}