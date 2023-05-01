import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../adapters/data/token";

export async function verifyIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const jwt = request.headers.authorization!;

  if (!Token.decode(jwt.replace("Bearer ", "")).isAdmin) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "Usuário não autorizado" });
  }
}