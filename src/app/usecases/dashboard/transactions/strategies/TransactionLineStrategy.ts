import { Injectable } from '@nestjs/common';
import { TransactionChartStrategy } from './TransactionChartStrategy';
import { Transaction } from 'src/domain/entities/Transaction';
import { BuildTransactionLineChartData } from '../../BuildTransactionLineChartData';

@Injectable()
export class TransactionLineStrategy implements TransactionChartStrategy {
  constructor(private readonly builder: BuildTransactionLineChartData) { }

  async execute(transactions: Transaction[]): Promise<any> {
    return this.builder.execute(transactions);
  }
}
