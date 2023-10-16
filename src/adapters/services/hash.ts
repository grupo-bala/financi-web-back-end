import { sha256 } from "sha.js";

export class Hash {
  static hash(input: string): string {
    return new sha256().update(input).digest("hex");
  }
}