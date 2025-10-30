import { Transaction } from "src/domain/entities/Transaction";
import { TransactionType } from "src/domain/value-objects/TransactionType";

export class TransactionMapper {
  static toDTO(transaction: Transaction): any {
    return {
      userId: transaction.userId,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
    };
  }

  static fromDTO(dto: any): Transaction {
    return new Transaction({
      userId: dto.userId,
      type: new TransactionType(dto.type),
      category: dto.category,
      amount: dto.amount,
      date: new Date(dto.date),
    });
  }
}