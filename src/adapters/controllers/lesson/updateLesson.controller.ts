import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateLesson } from "../../../usecases/lesson/updateLesson";
import { UpdateLessonInput } from "../schemas/lesson/updateLesson.schema";
import { StatusCodes } from "http-status-codes";
import { Lesson } from "../../../model/lesson";

export class UpdateLessonController {
  private readonly useCase: UpdateLesson;

  constructor(useCase: UpdateLesson) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      courseId,
      durationSeconds,
      name,
      videoURL,
      id,
    } = request.query as UpdateLessonInput;

    try {
      await this.useCase.update(new Lesson({
        courseId,
        durationSecs: durationSeconds,
        name,
        videoURL,
        id,
        viewedLesson: null,
      }));
    } catch (e) {
      const error = e as Error;

      if (error.message.includes("Esse curso não existe")) {
        await reply
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: error.message });
      } else {
        await reply
          .status(StatusCodes.CONFLICT)
          .send({ msg: error.message });
      }
    }
  }
}