import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllLessons } from "../../../usecases/lesson/getAllLessons";
import { GetAllLessonsInput } from "../schemas/lesson/getAllLessons.schema";
import { Token } from "../../data/token";
import { StatusCodes } from "http-status-codes";

export class GetAllLessonsController {
  private readonly useCase: GetAllLessons;

  constructor(useCase: GetAllLessons) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { courseId, page, size } = request.query as GetAllLessonsInput;
    const userId = Token.decode(request.cookies["financi-jwt"]!).id;

    const {
      lessons,
      howManyPages,
    } = await this.useCase.getAll(userId, page, size, courseId);

    await reply
      .status(StatusCodes.OK)
      .send({
        data: lessons,
        pages: howManyPages,
      });
  }
}