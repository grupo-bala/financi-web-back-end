import { Token } from "../../../src/adapters/data/token";
import { EnviromentVars } from "../../../src/server/config/enviromentVars";

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJzdWIiOiJhZG0iLCJhZG0iOnRydWUsImV4cCI6OTk5OTk5OTk5OSwiaWF0IjoxNjgzMDY5NDIxfQ.\
A4nYPOlqWmqnPfRRgA3M6-d82bIKiiy-T0AbOwILIsI";

jest.mock("../../../src/server/config/enviromentVars.ts");
Object.defineProperty(
  EnviromentVars,
  "vars",
  { get: () => ({ SECRET_KEY: "test" }) },
);

describe("testes do token jwt", () => {
  test("token deve manter o mesmo username e autoridade e durar 1 hora", () => {
    const username = "adm";
    const isAdmin = true;
    const millisecondsInSecond = 1000;
    const oneMinute = 60;
    const oneHour = oneMinute * oneMinute;

    const token = Token.encode(username, isAdmin);

    expect(token.username).toBe(username);
    expect(token.expirationTime).toBeCloseTo(
      Math.floor(Date.now() / millisecondsInSecond + oneHour),
    );
    expect(token.isAdmin).toBeTruthy();
  });

  test("token de teste deve ter username adm e ser administrador", () => {
    const token = Token.decode(testToken);

    expect(token.username).toBe("adm");
    expect(token.isAdmin).toBeTruthy();
  });

  test("token inválido deve lançar exceção", () => {
    expect(() => Token.decode("inválido")).toThrow();
  });
});