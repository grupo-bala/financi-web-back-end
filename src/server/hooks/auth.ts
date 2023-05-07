import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../adapters/data/token";

export async function validateJWT(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const jwt = request.cookies["financi-jwt"];

  if (!jwt) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "O token de autenticação é necessário" });
  }

  try {
    Token.decode(jwt);
  } catch (error) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "O token de autenticação é inválido" });
  }
}