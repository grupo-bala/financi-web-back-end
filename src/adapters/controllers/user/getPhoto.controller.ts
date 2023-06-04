import { FastifyReply, FastifyRequest } from "fastify";
import { Token } from "../../data/token";
import { Profile } from "../../services/profile";
import fs from "fs";
import { StatusCodes } from "http-status-codes";

export class GetPhotoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const token = Token.decode(
      request.cookies["financi-jwt"]!,
    );

    try {
      const filePath = await Profile.get(token.id);
      const fileStream = fs.createReadStream(filePath);

      await reply
        .type("application/octet-stream")
        .send(fileStream);
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}