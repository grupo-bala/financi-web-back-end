import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { updateLessonSchema } from "../../../adapters/controllers/schemas/lesson/updateLesson.schema";
import { UpdateLessonController } from "../../../adapters/controllers/lesson/updateLesson.controller";
import { UpdateLesson } from "../../../usecases/lesson/updateLesson";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerUpdateLessonRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-lesson", {
    schema: {
      body: updateLessonSchema,
      tags: ["lessons"],
    },
  }, async (req, res) => {
    await new UpdateLessonController(
      new UpdateLesson(
        new PostgresLessonRepository(),
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}