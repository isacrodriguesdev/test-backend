import { FetchTransaction } from './FetchTransactions';

describe('FetchTransaction', () => {
  const mockRepo: any = { FindByDate: jest.fn() };
  const mockFactory: any = { get: jest.fn() };

  it('should validate dates and call strategy', async () => {
    const fakeTransactions = [{ id: '1' }];
    mockRepo.FindByDate.mockResolvedValue(fakeTransactions);

    const mockStrategy: any = { execute: jest.fn().mockResolvedValue({ labels: [], datasets: [] }) };
    mockFactory.get.mockReturnValue(mockStrategy);

    const service = new FetchTransaction(mockRepo, mockFactory);

    const result = await service.execute({ chartType: 'line', startDate: '2025-01-01', endDate: '2025-12-31' });

    expect(mockRepo.FindByDate).toHaveBeenCalled();
    expect(mockFactory.get).toHaveBeenCalledWith('line');
    expect(mockStrategy.execute).toHaveBeenCalledWith(fakeTransactions);
    expect(result).toEqual({ labels: [], datasets: [] });
  });

  it('should throw on invalid dates', async () => {
    const service = new FetchTransaction(mockRepo, mockFactory);
    await expect(service.execute({ chartType: 'line', startDate: 'invalid', endDate: '2025-12-31' })).rejects.toBeDefined();
  });
});
