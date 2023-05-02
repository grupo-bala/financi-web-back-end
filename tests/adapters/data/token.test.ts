import { Token } from "../../../src/adapters/data/token";

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG0\
iLCJhZG0iOnRydWUsImV4cCI6MTY4MzA1MjY3NiwiaWF0IjoxNjgzMDQ\
5MDc2fQ.gP7hpJxWc84mPAA2lpBdcgmFdmgUOue-vVG-cLT_Owg";

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