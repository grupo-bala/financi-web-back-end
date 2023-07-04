import { FastifyReply, FastifyRequest } from "fastify";
import { EnviromentVars } from "../../../server/config/enviromentVars";

export class LogoutController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    if (EnviromentVars.vars.ENVIRONMENT === "debug") {
      await reply
        .setCookie("financi-jwt", "", {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          domain: EnviromentVars.vars.COOKIE_DOMAIN,
        })
        .send();
    } else {
      await reply
        .setCookie("financi-jwt", "", {
          httpOnly: true,
          path: "/",
          sameSite: "none",
          secure: true,
          domain: EnviromentVars.vars.COOKIE_DOMAIN,
        })
        .send();
    }
  }
}