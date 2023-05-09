import { z } from "zod";

const envKeys = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  SECRET_KEY: z.string(),
  SWAGGER_UI_HOST: z.string(),
  COOKIE_DOMAIN: z.string(),
  ENVIRONMENT: z.union([z.literal("debug"), z.literal("production")]),
});

type SafeEnvKeys = z.infer<typeof envKeys>;
type EnvKeys = {
  [K in keyof SafeEnvKeys]: string
}

export class EnviromentVars {
  private static isInitialized = false;
  private static envVars = {
    PORT: "",
    COOKIE_DOMAIN: "",
    DATABASE_URL: "",
    ENVIRONMENT: "",
    SECRET_KEY: "",
    SWAGGER_UI_HOST: "",
  } as EnvKeys;

  static validateVars() {
    for (const env in this.envVars) {
      const value = process.env[env];

      if (value === undefined) {
        throw new Error(`A variável ${env} não foi definida.`);
      }

      EnviromentVars.envVars[env as keyof EnvKeys] = value;
    }

    envKeys.parse(EnviromentVars.envVars);
    EnviromentVars.isInitialized = true;
  }

  static get vars() {
    if (!EnviromentVars.isInitialized) {
      EnviromentVars.validateVars();
    }

    return EnviromentVars.envVars as unknown as SafeEnvKeys;
  }
}