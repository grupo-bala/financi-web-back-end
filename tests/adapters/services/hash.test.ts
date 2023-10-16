import { Hash } from "../../../src/adapters/services/hash";

const expectedHash =
  "f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8";

describe("testes do hasher", () => {
  test(`hash de bala deve ser ${expectedHash}`, () => {
    expect(Hash.hash("bala")).toBe(expectedHash);
  });
});