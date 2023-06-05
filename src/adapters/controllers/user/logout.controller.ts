import { FastifyReply, FastifyRequest } from "fastify";

export class LogoutController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    await reply
      .setCookie("financi-jwt", "")
      .send();
  }
}