import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  removeGoalSchema,
} from "../../../adapters/controllers/schemas/goals/removeGoal.schema";
import {
  RemoveGoalController,
} from "../../../adapters/controllers/goals/removeGoal.controller";
import {
  RemoveGoal,
} from "../../../usecases/goals/removeGoal";
import {
  PostgresGoalsRepository,
} from "../../../adapters/repositories/postgresGoalsRepository";

export async function registerRemoveGoalRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete("/remove-goal", {
    schema: {
      body: removeGoalSchema,
      tags: ["goals"],
    },
  }, async (req, res) => {
    await new RemoveGoalController(
      new RemoveGoal(
        new PostgresGoalsRepository(),
      ),
    ).handle(req, res);
  });
}