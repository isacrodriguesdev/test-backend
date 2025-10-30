import { Transaction } from "src/domain/entities/Transaction";

type Dataset = {
  label: string;
  data: number[];
}

interface LineChartData {
  labels: string[];
  datasets: Dataset[];
}

export class BuildTransactionLineChartData {
  constructor() { }

  async execute(transactions: Transaction[]) {
    const data: LineChartData = {
      labels: [],
      datasets: [
        { label: 'Income', data: [] },
        { label: 'Expense', data: [] }
      ]
    };

    if (!transactions.length) {
      return data;
    }

    const grouped: Record<string, { income: number; expense: number }> = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = date.toLocaleString('default', { month: 'short' });

      if (!grouped[month]) {
        grouped[month] = { income: 0, expense: 0 };
      }

      if (t.type === 'INCOME') {
        grouped[month].income += t.amount;
      } else if (t.type === 'EXPENSE') {
        grouped[month].expense += t.amount;
      }
    });

    Object.keys(grouped).forEach(key => {
      data.labels.push(key);
      data.datasets[0].data.push(grouped[key].income);
      data.datasets[1].data.push(grouped[key].expense);
    });

    return data;
  }
}
