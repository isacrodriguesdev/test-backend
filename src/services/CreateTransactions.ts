import { Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/entities/Transaction";
import { TransactionRepository } from "src/domain/repositories/TransactionRepository";

@Injectable()
export class CreateTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository
  ) { }

  public async execute(transaction: Transaction) {
    try {
      await this.transactionRepository.create(transaction);
      return transaction.toJson();
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
}