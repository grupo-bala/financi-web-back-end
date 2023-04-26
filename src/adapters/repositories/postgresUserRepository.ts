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

  async add({ username, balance, fixedIncome, password, email, isAdmin, name }: User): Promise<void> {
    await new PrismaHelper()
      .client
      .financi_user
      .create({
        data: {
          name,
          username,
          balance,
          isadmin: isAdmin,
          fixedincome: fixedIncome,
          password: password.value,
          email: email.value,
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

    return new User({
      id: user.id,
      name: user.name,
      username: user.username,
      fixedIncome: user.fixedincome,
      balance: user.fixedincome,
      email: new Email(user.email),
      password: Password.fromHash(user.password),
      isAdmin: user.isadmin
    });
  }
}