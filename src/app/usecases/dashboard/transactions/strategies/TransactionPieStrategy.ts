import { Injectable } from '@nestjs/common';
import { TransactionChartStrategy } from './TransactionChartStrategy';
import { Transaction } from 'src/domain/entities/Transaction';
import { BuildTransactionPieChartData } from '../../BuildTransactionPieChartData';

@Injectable()
export class TransactionPieStrategy implements TransactionChartStrategy {
  constructor(private readonly builder: BuildTransactionPieChartData) {}

  async execute(transactions: Transaction[]): Promise<any> {
    return this.builder.execute(transactions);
  }
}
