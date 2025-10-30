import { Injectable } from "@nestjs/common";
import { BuildTransactionLineChartData } from "src/app/usecases/dashboard/BuildTransactionLineChartData";
import { BuildTransactionPieChartData } from "src/app/usecases/dashboard/BuildTransactionPieChartData";
import { TransactionChartStrategyFactory } from 'src/app/usecases/dashboard/transactions/strategies/TransactionChartStrategyFactory';
import { TransactionRepository } from "src/domain/repositories/TransactionRepository";

@Injectable()
export class FetchTransaction {

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly buildTransactionPieChartData: BuildTransactionPieChartData,
    private readonly buildTransactionLineChartData: BuildTransactionLineChartData,
    private readonly chartStrategyFactory: TransactionChartStrategyFactory,
  ) { }

  public async execute(filter: any): Promise<any> {
    const { chartType, startDate, endDate } = filter;
    console.log('FetchTransaction execute called with:', filter);

    const transactions = await this.transactionRepository.FindByDate(startDate, endDate);

    const strategy = this.chartStrategyFactory.get(chartType);
    const result = await strategy.execute(transactions);
    return result;
  }
}