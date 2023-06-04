import { MultipartFile } from "@fastify/multipart";
import { Profile } from "../../adapters/services/profile";

export class UploadPhoto {
  async save(userId: number, fileData: MultipartFile) {
    await Profile.save(userId, fileData);
  }
}