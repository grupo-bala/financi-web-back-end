import { FastifyInstance } from "fastify";
import {
  UploadPhotoController,
} from "../../../adapters/controllers/user/uploadPhoto.controller";
import { UploadPhoto } from "../../../usecases/user/uploadPhoto";

export async function registerUploadPhotoRoute(fastify: FastifyInstance) {
  fastify.post("/upload-photo", {
    schema: {
      tags: ["user"],
      consumes: ["multipart/form-data"],
      body: {
        required: ["file"],
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
    validatorCompiler: ({ schema: _s, method: _m, url: _u, httpPart: _h }) => {
      return (_data) => true;
    },
  }, async (req, res) => {
    await new UploadPhotoController(
      new UploadPhoto(),
    ).handle(req, res);
  });
}