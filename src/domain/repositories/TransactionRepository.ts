import { ITransaction, Transaction } from "src/domain/entities/Transaction";

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract FindByDate(startDate: Date, endDate?: Date): Promise<Transaction[]>
}