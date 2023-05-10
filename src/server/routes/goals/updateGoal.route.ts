import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  updateGoalSchema,
} from "../../../adapters/controllers/schemas/goals/updateGoal.schema";
import {
  UpdateGoalController,
} from "../../../adapters/controllers/goals/updateGoal.controller";
import {
  UpdateGoal,
} from "../../../usecases/goals/updateGoal";
import {
  PostgresGoalsRepository,
} from "../../../adapters/repositories/postgresGoalsRepository";

export async function registerUpdateGoalRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-goal", {
    schema: {
      body: updateGoalSchema,
      tags: ["goals"],
    },
  }, async (req, res) => {
    new UpdateGoalController(
      new UpdateGoal(
        new PostgresGoalsRepository(),
      ),
    ).handle(req, res);
  });
}