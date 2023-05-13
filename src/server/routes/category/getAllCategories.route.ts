import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetAllCategoriesController } from "../../../adapters/controllers/category/getAllCategories.controller";
import { GetAllCategories } from "../../../usecases/category/getAllCategories";
import { PostgresCategoryRepository } from "../../../adapters/repositories/postgresCategoryRepository";

export async function registerGetAllCategoriesRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-all-categories", {
    schema: {
      tags: ["categories"],
    },
  }, async (req, res) => {
    await new GetAllCategoriesController(
      new GetAllCategories(
        new PostgresCategoryRepository(),
      ),
    ).handle(req, res);
  });
}