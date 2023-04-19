import { Hash } from "../../../src/adapters/services/hash";

describe("testes do hasher", () => {
  test("hash de bala deve ser f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8", () => {
    expect(Hash.hash("bala")).toBe("f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8");
  })
});