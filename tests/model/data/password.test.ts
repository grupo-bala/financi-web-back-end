import { Password } from "../../../src/model/data/password";

const expectedHash =
  "f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8";

describe("testes da senha", () => {
  test(`valor da senha bala deve ser ${expectedHash}`, () => {
    expect(
      Password.fromString("bala").value,
    ).toBe(expectedHash);
  });

  test(`valor do hash ${expectedHash}`, () => {
    expect(
      Password.fromHash(expectedHash).value,
    ).toBe(expectedHash);
  });
});