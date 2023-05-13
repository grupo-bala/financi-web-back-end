import { pipeline } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";
import { join } from "path";
import { MultipartFile } from "@fastify/multipart";

export class UploadPhoto {
  async save(userId: number, fileData: MultipartFile) {
    const pump = promisify(pipeline);
    await pump(fileData.file, createWriteStream(
      join(process.cwd(), `public/users/profiles/${userId}`),
    ));
  }
}