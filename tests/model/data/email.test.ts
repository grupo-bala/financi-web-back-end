import { Email } from "../../../src/model/data/email";

describe("testes do email", () => {
  test("email grupo@bala.com é válido", () => {
    expect(() => new Email("grupo@bala.com")).not.toThrow();
  });

  test("email grupo@bala não é válido", () => {
    expect(() => new Email("grupo@bala")).toThrow();
  });

  test("email grupo.com não é válido", () => {
    expect(() => new Email("grupo.com")).toThrow();
  });
})