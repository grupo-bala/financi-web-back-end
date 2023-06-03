import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { removeLessonSchema } from "../../../adapters/controllers/schemas/lesson/removeLesson.schema";
import { RemoveLessonController } from "../../../adapters/controllers/lesson/removeLesson.controller";
import { RemoveLesson } from "../../../usecases/lesson/removeLesson";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerRemoveLessonRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete("/remove-lesson", {
    schema: {
      body: removeLessonSchema,
      tags: ["lessons"],
    },
  }, async (req, res) => {
    await new RemoveLessonController(
      new RemoveLesson(
        new PostgresLessonRepository(),
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}