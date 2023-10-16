import { FastifyReply, FastifyRequest } from "fastify";
import { GetLesson } from "../../../usecases/lesson/getLesson";
import { GetLessonInput } from "../schemas/lesson/getLesson.schema";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../data/token";

export class GetLessonController {
  private readonly useCase: GetLesson;

  constructor(useCase: GetLesson) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { courseId, id } = request.query as GetLessonInput;
    const userId = Token.decode(request.cookies["financi-jwt"]!).id;

    try {
      const lesson = await this.useCase.get(userId, id, courseId);

      await reply.status(StatusCodes.OK)
        .send({ data: lesson });
    } catch (e) {
      const error = e as Error;

      await reply.status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}