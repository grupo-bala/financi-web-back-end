import { FastifyReply, FastifyRequest } from "fastify";
import { UploadPhoto } from "../../../usecases/user/uploadPhoto";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class UploadPhotoController {
  readonly useCase: UploadPhoto;

  constructor(useCase: UploadPhoto) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await request.file();
      const token = Token.decode(
        request.cookies["financi-jwt"]!,
      );

      if (data === undefined) {
        await reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ msg: "Arquivo não enviado" });
        return;
      }

      await this.useCase.save(token.id, data!);
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: error.message });
    }
  }
}