import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateLessonWatchedStatus } from "../../../usecases/lesson/updateLessonWatchedStatus";
import { UpdateLessonWatchedStatusInput } from "../schemas/lesson/updateLessonWatchedStatus.schema";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../data/token";

export class UpdateLessonWatchedStatusController {
  private readonly useCase: UpdateLessonWatchedStatus;

  constructor(useCase: UpdateLessonWatchedStatus) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      courseId, id, status,
    } = request.body as UpdateLessonWatchedStatusInput;
    const userId = Token.decode(request.cookies["financi-jwt"]!).id;

    try {
      await this.useCase.updateWatchedStatus(status, userId, id, courseId);

      await reply.status(StatusCodes.OK).send();
    } catch (e) {
      const error = e as Error;

      if (error.message === "A aula já possui esse status de visualização") {
        await reply
          .status(StatusCodes.CONFLICT)
          .send({ msg: error.message });
      } else {
        await reply
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: error.message });
      }
    }
  }
}