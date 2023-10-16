import { MultipartFile } from "@fastify/multipart";
import { createWriteStream } from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs/promises";

export class Profile {
  static staticPath = path.join(process.cwd(), "public/users/profiles");

  static async save(userId: number, fileData: MultipartFile) {
    const pump = promisify(pipeline);
    await pump(fileData.file, createWriteStream(
      path.join(Profile.staticPath, userId.toString()),
    ));
  }

  static async get(userId: number) {
    const filePath = path.join(Profile.staticPath, userId.toString());
    try {
      await fs.stat(filePath);
      return filePath;
    } catch (_) {
      return path.join(Profile.staticPath, "default");
    }
  }
}