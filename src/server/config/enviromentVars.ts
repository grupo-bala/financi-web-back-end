import { config } from "dotenv";
import path from "path";

const envKeys = ["PORT", "DATABASE_URL", "SECRET_KEY"] as const;
type EnvVars = typeof envKeys[number];

export class EnviromentVars {
  private static isInitialized = false;
  private static envVars = {} as { [ K in EnvVars ]: string };

  static validateVars() {
    config({
      override: true,
      path: path.resolve(__dirname, "../../../.env"),
    });

    for (const env of envKeys) {
      const value = process.env[env];

      if (value === undefined) {
        throw new Error(`A variável ${env} não foi definida.`);
      }

      EnviromentVars.envVars[env as EnvVars] = value;
    }

    EnviromentVars.isInitialized = true;
  }

  static get vars() {
    if (!EnviromentVars.isInitialized) {
      EnviromentVars.validateVars();
    }

    return EnviromentVars.envVars;
  }
}