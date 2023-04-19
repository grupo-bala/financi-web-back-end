import { Email } from "../../model/data/email";
import { Password } from "../../model/data/password";
import { User } from "../../model/user";
import { UserRepository } from "../../usecases/interfaces/userRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresUserRepository implements UserRepository {
  async exists(username: string): Promise<boolean> {
    const sameIdQtd = await new PrismaHelper()
      .client
      .financi_user
      .count({
        where: {
          username
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
          password: user.password.value,
          email: user.email.value
        }
      });
  }

  async getByUsername(username: string): Promise<User> {
    const user = await new PrismaHelper()
      .client
      .financi_user
      .findFirst({
        where: {
          username
        }
      });
    
    if (user === null) {
      throw new Error("Usuário não existente");
    }

    return new User(
      user.id,
      user.name,
      user.username,
      user.fixedincome,
      user.balance,
      new Email(user.email),
      Password.fromHash(user.password)
    );
  }
}