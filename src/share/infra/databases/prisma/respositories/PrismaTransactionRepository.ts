import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/entities/Transaction";
import { TransactionRepository } from "src/domain/repositories/TransactionRepository";
import { TransactionType } from "src/domain/value-objects/TransactionType";
import { PrismaTransactionRepositoryMapper } from "src/share/infra/databases/prisma/mappers/PrismaTransactionRepositoryMapper";

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(transaction: Transaction): Promise<Transaction> {
    const created = await this.prisma.transaction.create({
      data: PrismaTransactionRepositoryMapper.toPrisma(transaction),
    });

    return PrismaTransactionRepositoryMapper.fromPrisma(created);
  }

  async FindByDate(startDate: Date, endDate: Date = new Date()): Promise<Transaction[]> {
    const results = await this.prisma.transaction.findMany({
      // where: {
      //   date: {
      //     gte: startDate,
      //     lte: endDate,
      //   },
      // },
      orderBy: {
        date: "asc",
      },
    })

    return results.map(prismaData => PrismaTransactionRepositoryMapper.fromPrisma(prismaData));
  }
}
