import { User } from "../../model/user";

export interface UserRepository {
  exists: (username: string) => Promise<boolean>;
  add: (user: User) => Promise<User>;
  getByUsername: (username: string) => Promise<User>;
}