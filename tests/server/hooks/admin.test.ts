/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { Token } from "../../../src/adapters/data/token";
import { EnviromentVars } from "../../../src/server/config/enviromentVars";
import { verifyIsAdmin } from "../../../src/server/hooks/admin";

jest.mock("../../../src/server/config/enviromentVars.ts");
Object.defineProperty(
  EnviromentVars,
  "vars",
  { get: () => ({ SECRET_KEY: "test" }) },
);

describe("testes do hook de admin", () => {
  test("token sem autorização deve falhar", async () => {
    const token = Token.encode("test", false);
    const request = {
      cookies: {
        "financi-jwt": token.encoded,
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

    await verifyIsAdmin(request, response);

    expect(response.statusCode)
      .toBe(StatusCodes.UNAUTHORIZED);
  });

  test("token autorizado deve passar", async () => {
    const token = Token.encode("test", true);
    const request = {
      cookies: {
        "financi-jwt": token.encoded,
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

    await verifyIsAdmin(request, response);

    expect(response.statusCode)
      .toBe(StatusCodes.OK);
  });
});