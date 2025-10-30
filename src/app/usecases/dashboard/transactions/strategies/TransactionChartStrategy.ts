import { Transaction } from 'src/domain/entities/Transaction';

export interface TransactionChartStrategy {
  execute(transactions: Transaction[]): Promise<any>;
}
