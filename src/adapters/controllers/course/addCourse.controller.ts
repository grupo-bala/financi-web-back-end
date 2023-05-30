import { FastifyReply, FastifyRequest } from "fastify";
import { AddCourse } from "../../../usecases/course/addCourse";
import { AddCourseInput } from "../schemas/course/addCourse.schema";
import { Course } from "../../../model/course";
import { StatusCodes } from "http-status-codes";

export class AddCourseController {
  private readonly useCase: AddCourse;

  constructor(useCase: AddCourse) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as AddCourseInput;

    await this.useCase.add(new Course(
      title,
      description,
      null,
      null,
      null,
    ));

    await reply.status(StatusCodes.CREATED).send();
  }
}