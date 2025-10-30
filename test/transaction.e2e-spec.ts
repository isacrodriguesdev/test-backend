// Mock the TransactionMapper to avoid loading unrelated modules
jest.mock('src/share/infra/mappers/TransactionMapper', () => ({
  TransactionMapper: { fromDTO: (dto: any) => ({ ...dto }) },
}));

import { TransactionController } from '../src/controllers/transaction.controller';

describe('TransactionController (e2e minimal)', () => {
  it('fetchByFilter should call FetchTransaction.execute and return formatted data', async () => {
    const mockFetch: any = { execute: jest.fn().mockResolvedValue({ labels: [], datasets: [] }) };
    const controller = new TransactionController({} as any, mockFetch);

    const res = await controller.fetchByFilter({ chartType: 'line', startDate: '2025-01-01', endDate: '2025-12-31' } as any);
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    expect(mockFetch.execute).toHaveBeenCalled();
  });
});
