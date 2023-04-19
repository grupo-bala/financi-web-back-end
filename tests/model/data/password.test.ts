import { Password } from "../../../src/model/data/password";

describe("testes da senha", () => {
  test("valor da senha bala deve ser f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8", () => {
    expect(
      Password.fromString("bala").value
    ).toBe("f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8");
  });

  test("valor do hash f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8 deve ser ele mesmo", () => {
    expect(
      Password.fromHash("f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8").value
    ).toBe("f2fdd58856e77152463d6183ffa198d69bb241ddf8378734c4d074f74544f4c8");
  });
});