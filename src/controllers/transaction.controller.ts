import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreateTransaction } from "src/services/CreateTransactions";
import { FetchTransaction } from "src/services/FetchTransactions";
import { Auth } from "src/share/infra/auth/auth.decorator";
import { JwtAuthGuard } from "src/share/infra/auth/jwt-auth.guard";
import { TransactionMapper } from "src/share/infra/mappers/TransactionMapper";

@Controller("api/transaction")
export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly fetchTransaction: FetchTransaction
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() transaction: any, @Auth() user: any) {
    console.log(transaction)
    return this.createTransaction.execute(
      TransactionMapper.fromDTO({
        ...transaction,
        userId: user.id
      })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchByFilter(@Query() query: Record<string, any>) {
    return this.fetchTransaction.execute(query);
  }
}