import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { addLessonSchema } from "../../../adapters/controllers/schemas/lesson/addLesson.schema";
import { AddLessonController } from "../../../adapters/controllers/lesson/addLesson.controller";
import { AddLesson } from "../../../usecases/lesson/addLesson";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerAddLessonRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/add-lesson", {
    schema: {
      body: addLessonSchema,
      tags: ["lessons"],
    },
  }, async (req, res) => {
    await new AddLessonController(
      new AddLesson(
        new PostgresLessonRepository(),
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}