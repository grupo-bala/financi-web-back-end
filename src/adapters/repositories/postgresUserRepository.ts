import { User } from "../../model/user";
import { UserRepository } from "../../usecases/interfaces/userRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresUserRepository implements UserRepository {
  async exists(user: User): Promise<boolean> {
    const sameIdQtd = await new PrismaHelper()
      .client
      .financi_user
      .count({
        where: {
          id: user.id
        }
      });
    
    return sameIdQtd > 0;
  }

  async add(user: User): Promise<void> {
    await new PrismaHelper()
      .client
      .financi_user
      .create({
        data: {
          name: user.name,
          username: user.username,
          balance: user.balance,
          fixedincome: user.fixedIncome,
          password: user.password.value
        }
      });
  }
}