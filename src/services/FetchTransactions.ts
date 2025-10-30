import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TransactionChartStrategyFactory } from 'src/app/usecases/dashboard/transactions/strategies/TransactionChartStrategyFactory';
import { TransactionRepository } from "src/domain/repositories/TransactionRepository";

@Injectable()
export class FetchTransaction {

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly chartStrategyFactory: TransactionChartStrategyFactory,
  ) { }

  public async execute(filter: any): Promise<any> {
    const { chartType, startDate, endDate } = filter;

    // garantir que startDate e endDate existem (DTO já valida formato) e converte-los para Date
    if (!startDate || !endDate) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Start date and end date are required.',
      }, HttpStatus.BAD_REQUEST);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid date format. Use YYYY-MM-DD.',
      }, HttpStatus.BAD_REQUEST);
    }

    if (start > end) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'startDate must be before or equal to endDate.',
      }, HttpStatus.BAD_REQUEST);
    }

    const transactions = await this.transactionRepository.FindByDate(start, end);

    const strategy = this.chartStrategyFactory.get(chartType);
    const result = await strategy.execute(transactions);
    return result;
  }
}