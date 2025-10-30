import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransaction } from "src/services/CreateTransactions";
import { FetchTransaction } from "src/services/FetchTransactions";
import { Auth } from "src/share/infra/auth/auth.decorator";
import { JwtAuthGuard } from "src/share/infra/auth/jwt-auth.guard";
import { CreateTransactionBody } from "src/share/infra/http/dtos/CreateTransactionBody";
import { FetchTransactionQueryParams } from "src/share/infra/http/dtos/FetchTransactionQueryParams";
import { TransactionMapper } from "src/share/infra/mappers/TransactionMapper";

@ApiTags('transaction')
@ApiBearerAuth()
@Controller("api/transaction")
export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransaction,
    private readonly fetchTransaction: FetchTransaction
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 200, description: 'Transaction created' })
  async create(@Body() transaction: CreateTransactionBody, @Auth() user: any) {
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
  @ApiOperation({ summary: 'Fetch transactions for dashboard with filters' })
  @ApiResponse({ status: 200, description: 'Returns data formatted according to chartType' })
  async fetchByFilter(@Query() query: FetchTransactionQueryParams) {
    return this.fetchTransaction.execute(query);
  }
}