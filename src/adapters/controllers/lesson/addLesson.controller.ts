import { FastifyReply, FastifyRequest } from "fastify";
import { AddLesson } from "../../../usecases/lesson/addLesson";
import { AddLessonInput } from "../schemas/lesson/addLesson.schema";
import { Lesson } from "../../../model/lesson";
import { StatusCodes } from "http-status-codes";

export class AddLessonController {
  readonly usecase: AddLesson;

  constructor(usecase: AddLesson) {
    this.usecase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      name,
      courseId,
      durationSeconds,
      videoURL,
    } = request.body as AddLessonInput;

    try {
      await this.usecase.add(
        new Lesson({
          id: null,
          durationSecs: durationSeconds,
          videoURL,
          courseId,
          name,
          viewedLesson: null,
        }),
      );

      await reply
        .status(StatusCodes.CREATED)
        .send();
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