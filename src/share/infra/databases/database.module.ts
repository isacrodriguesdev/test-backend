
import { Module } from "@nestjs/common";
import { TransactionRepository } from "src/domain/repositories/TransactionRepository";
import { PrismaTransactionRepository } from "src/share/infra/databases/prisma/respositories/PrismaTransactionRepository";
import { PrismaService } from "src/database/prisma.service";
import { UserRepository } from "src/domain/repositories/UserResository";
import { PrismaUserRepository } from "src/share/infra/databases/prisma/respositories/PrismaUserRepository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [UserRepository, TransactionRepository, PrismaService],
})
export class DatabaseModule { }