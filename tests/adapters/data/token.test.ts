import { Token } from "../../../src/adapters/data/token";
import { EnviromentVars } from "../../../src/server/config/enviromentVars";

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJzdWIiOjEsImFkbSI6dHJ1ZSwiZXhwIjo5OTk5OTk5OTk5OTk5LCJpYXQiOjE2ODM2MzI0NjJ9.\
KMo_9ZIzljJOeNuhMvmuvatpzSuREAVtYIWDROElcl0";

jest.mock("../../../src/server/config/enviromentVars.ts");
Object.defineProperty(
  EnviromentVars,
  "vars",
  { get: () => ({ SECRET_KEY: "test" }) },
);

describe("testes do token jwt", () => {
  test("token deve manter o mesmo username e autoridade e durar 1 hora", () => {
    const id = 1;
    const isAdmin = true;
    const millisecondsInSecond = 1000;
    const oneMinute = 60;
    const oneHour = oneMinute * oneMinute;

    const token = Token.encode(id, isAdmin);
    const maximumDifference = millisecondsInSecond * oneMinute;
    const nextHour = Math.floor(Date.now() / millisecondsInSecond + oneHour);

    expect(token.id).toBe(id);
    expect(token.expirationTime - nextHour)
      .toBeLessThanOrEqual(maximumDifference);
    expect(token.isAdmin).toBeTruthy();
  });

  test("token de teste deve ter username adm e ser administrador", () => {
    const token = Token.decode(testToken);
    const expectedId = 1;

    expect(token.id).toBe(expectedId);
    expect(token.isAdmin).toBeTruthy();
  });

  test("token inválido deve lançar exceção", () => {
    expect(() => Token.decode("inválido")).toThrow();
  });
});