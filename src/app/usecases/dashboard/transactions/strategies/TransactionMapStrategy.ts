import { Injectable } from '@nestjs/common';
import { TransactionChartStrategy } from './TransactionChartStrategy';
import { Transaction } from 'src/domain/entities/Transaction';

@Injectable()
export class TransactionMapStrategy implements TransactionChartStrategy {
  async execute(transactions: Transaction[]): Promise<any> {
    return transactions.map(t => t.toJson());
  }
}
