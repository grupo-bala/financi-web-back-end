import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";
import { updateLessonWatchedStatusSchema } from "../../../adapters/controllers/schemas/lesson/updateLessonWatchedStatus.schema";
import { UpdateLessonWatchedStatus } from "../../../usecases/lesson/updateLessonWatchedStatus";
import { UpdateLessonWatchedStatusController } from "../../../adapters/controllers/lesson/updateLessonWatchedStatus.controller";

export async function registerUpdateLessonWatchedStatusRoute(
  fastify: FastifyInstance,
) {
  fastify.withTypeProvider<ZodTypeProvider>()
    .put("/update-lesson-watched-status", {
      schema: {
        body: updateLessonWatchedStatusSchema,
        tags: ["lessons"],
      },
    }, async (req, res) => {
      await new UpdateLessonWatchedStatusController(
        new UpdateLessonWatchedStatus(
          new PostgresLessonRepository(),
          new PostgresCourseRepository(),
        ),
      ).handle(req, res);
    });
}