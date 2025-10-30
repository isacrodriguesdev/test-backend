import { Transaction } from "src/domain/entities/Transaction";
import { TransactionType } from "src/domain/value-objects/TransactionType";

export class PrismaTransactionRepositoryMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      createdAt: transaction.createdAt,
    };
  }

  static fromPrisma(prismaData: any): Transaction {
    return new Transaction(
      {
        userId: prismaData.userId,
        type: new TransactionType(prismaData.type),
        category: prismaData.category,
        amount: Number(prismaData.amount),
        date: prismaData.date,
        createdAt: prismaData.createdAt,
      },
      prismaData.id,
    );
  }
}