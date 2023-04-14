import { User } from "../../model/user";

export interface UserRepository {
  exists: (user: User) => Promise<boolean>;
  add: (user: User) => Promise<void>;
}