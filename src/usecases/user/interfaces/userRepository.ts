import { Email } from "../../../model/data/email";
import { User } from "../../../model/user";

export interface UserRepository {
  exists: (username: string) => Promise<boolean>;
  add: (user: User) => Promise<User>;
  getByUsername: (username: string) => Promise<User>;
  getById: (userId: number) => Promise<User>;
  update: (userId: number, email: Email, name: string, fixedIncome: number)
    => Promise<void>;
}