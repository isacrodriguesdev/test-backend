import { Injectable } from '@nestjs/common';
import { TransactionChartStrategy } from './TransactionChartStrategy';
import { TransactionMapStrategy } from './TransactionMapStrategy';
import { TransactionPieStrategy } from './TransactionPieStrategy';
import { TransactionLineStrategy } from './TransactionLineStrategy';

export type TransactionChartType = 'pie' | 'line' | 'map' | string;

@Injectable()
export class TransactionChartStrategyFactory {
  constructor(
    private readonly mapStrategy: TransactionMapStrategy,
    private readonly pieStrategy: TransactionPieStrategy,
    private readonly lineStrategy: TransactionLineStrategy,
  ) {}

  public get(chartType?: TransactionChartType): TransactionChartStrategy {
    if (!chartType) return this.mapStrategy;

    const normalized = chartType.toString().toLowerCase();

    switch (normalized) {
      case 'pie':
        return this.pieStrategy;
      case 'line':
        return this.lineStrategy;
      case 'map':
      default:
        return this.mapStrategy;
    }
  }
}
