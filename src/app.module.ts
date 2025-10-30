import { Module } from '@nestjs/common';
import { BuildTransactionLineChartData } from 'src/app/usecases/dashboard/BuildTransactionLineChartData';
import { BuildTransactionPieChartData } from 'src/app/usecases/dashboard/BuildTransactionPieChartData';
import { TransactionChartStrategyFactory } from 'src/app/usecases/dashboard/transactions/strategies/TransactionChartStrategyFactory';
import { TransactionMapStrategy } from 'src/app/usecases/dashboard/transactions/strategies/TransactionMapStrategy';
import { TransactionPieStrategy } from 'src/app/usecases/dashboard/transactions/strategies/TransactionPieStrategy';
import { TransactionLineStrategy } from 'src/app/usecases/dashboard/transactions/strategies/TransactionLineStrategy';
import { TransactionController } from 'src/controllers/transaction.controller';
import { UserController } from 'src/controllers/user.controller';
import { CreateTransaction } from 'src/services/CreateTransactions';
import { FetchTransaction } from 'src/services/FetchTransactions';
import { LoginUser } from 'src/services/LoginUser';
import { RegisterUser } from 'src/services/RegisterUser';
import { AuthModule } from 'src/share/infra/auth/auth.module';
import { CryptographyModule } from 'src/share/infra/cryptography/cryptography.module';
import { DatabaseModule } from 'src/share/infra/databases/database.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  controllers: [UserController, TransactionController],
  providers: [
    RegisterUser,
    LoginUser,
    FetchTransaction,
    CreateTransaction,
  BuildTransactionPieChartData,
  BuildTransactionLineChartData,
  TransactionChartStrategyFactory,
  TransactionMapStrategy,
  TransactionPieStrategy,
  TransactionLineStrategy,
  ],
})
export class AppModule { }
