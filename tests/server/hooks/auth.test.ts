/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { validateJWT } from "../../../src/server/hooks/auth";
import { EnviromentVars } from "../../../src/server/config/enviromentVars";

jest.mock("../../../src/server/config/enviromentVars.ts");
Object.defineProperty(
  EnviromentVars,
  "vars",
  { get: () => ({ SECRET_KEY: "test" }) },
);

describe("testes do hook de autenticação", () => {
  test("cabeçalho sem token deve falhar", async () => {
    const request = {
      cookies: {},
    } as any;

    const response = {
      statusCode: StatusCodes.OK,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      send() {
        return this;
      },
    } as any;

    await validateJWT(request, response);

    expect(response.statusCode)
      .toBe(StatusCodes.UNAUTHORIZED);
  });

  test("token inválido deve falhar", async () => {
    const request = {
      cookies: {
        "financi-jwt": "invalid",
      },
    } as any;

    const response = {
      statusCode: StatusCodes.OK,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      send() {
        return this;
      },
    } as any;

    await validateJWT(request, response);

    expect(response.statusCode)
      .toBe(StatusCodes.UNAUTHORIZED);
  });
});