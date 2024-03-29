import { XLSX } from "../../adapters/services/xlsx";
import { Interval } from "../statistics/data/Filter";
import { UserRepository } from "../user/interfaces/userRepository";
import { TransactionRepository } from "./interface/transactionRepository";

export class GenerateReportXLSX {
  private readonly transactionRepository: TransactionRepository;
  private readonly userRepository: UserRepository;

  constructor(
    transactionRepository: TransactionRepository,
    userRepository: UserRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  async generate(userId: number, interval: Interval) {
    if (interval.endDate < interval.initDate) {
      throw new Error("A data final não pode ser menor que a data inicial");
    }

    const user = await this.userRepository.getById(userId);
    const transactions = await this.transactionRepository
      .getByPeriod(userId, interval);

    return await XLSX.generateReport(transactions, user.username);
  }
}