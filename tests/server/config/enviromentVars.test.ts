import { EnviromentVars } from "../../../src/server/config/enviromentVars";

describe("testes da variáveis de ambiente", () => {
  const env = process.env;

  test(
    "variável de ambiente não está definida e por isso deve soltar uma exceção",
    () => {
      process.env = {};

      expect(() => {
        EnviromentVars.validateVars();
      }).toThrow();

      process.env = env;
    },
  );
});