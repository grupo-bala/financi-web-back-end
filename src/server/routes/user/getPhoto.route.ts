import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetPhotoController } from "../../../adapters/controllers/user/getPhoto.controller";

export async function registerGetPhotoRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-photo", {
    schema: {
      tags: ["user"],
    },
  }, async (req, res) => {
    await new GetPhotoController().handle(req, res);
  });
}