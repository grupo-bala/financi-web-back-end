import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getLessonSchema } from "../../../adapters/controllers/schemas/lesson/getLesson.schema";
import { GetLessonController } from "../../../adapters/controllers/lesson/getLesson.controller";
import { GetLesson } from "../../../usecases/lesson/getLesson";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerGetLessonRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-lesson", {
    schema: {
      querystring: getLessonSchema,
      tags: ["lessons"],
    },
  }, async (req, res) => {
    await new GetLessonController(
      new GetLesson(
        new PostgresLessonRepository(),
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}