import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveLesson } from "../../../usecases/lesson/removeLesson";
import { RemoveLessonInput } from "../schemas/lesson/removeLesson.schema";
import { StatusCodes } from "http-status-codes";

export class RemoveLessonController {
  private readonly useCase: RemoveLesson;

  constructor(useCase: RemoveLesson) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id, courseId } = request.query as RemoveLessonInput;

    try {
      await this.useCase.remove(id, courseId);

      await reply.status(StatusCodes.OK).send();
    } catch (e) {
      const error = e as Error;

      await reply.status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}