import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../adapters/data/token";

export async function validateJWT(request: FastifyRequest, reply: FastifyReply) {
  if (request.url.includes("register") || request.url.includes("login")) {
    return;
  }

  const jwt = request.headers.authorization;
  if (!jwt) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "O token de autenticação é necessário" });
  }

  try {
    Token.decode(jwt.replace("Bearer ", ""));
  } catch (error) {
    return await reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "O token de autenticação é inválido" });
  }
}