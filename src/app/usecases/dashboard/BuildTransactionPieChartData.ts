import { Transaction } from "src/domain/entities/Transaction";

interface PieChartData {
  label: string;
  value: number;
}

export class BuildTransactionPieChartData {
  constructor() { }

  async execute(transactions: Transaction[]) {
    const data: PieChartData[] = [];

    const incomeTransactions = transactions.filter(t => t.type === 'INCOME');
    const expenseTransactions = transactions.filter(t => t.type === 'EXPENSE');

    const incomeTotal = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const expenseTotal = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    const total = incomeTotal + expenseTotal;
    const incomePercentage = total === 0 ? 0 : (incomeTotal / total) * 100;
    const expensePercentage = total === 0 ? 0 : (expenseTotal / total) * 100;

    data.push({ label: 'Income', value: parseFloat(incomePercentage.toFixed(2)) });
    data.push({ label: 'Expense', value: parseFloat(expensePercentage.toFixed(2)) });

    return data;
  }
}