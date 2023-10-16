import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../adapters/data/token";

export async function verifyIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const jwt = request.cookies["financi-jwt"]!;

  if (!Token.decode(jwt).isAdmin) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "Usuário não autorizado" });
  }
}