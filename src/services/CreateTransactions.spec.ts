import { CreateTransaction } from './CreateTransactions';
import { HttpException } from '@nestjs/common';

describe('CreateTransaction', () => {
  it('should create a transaction and return json', async () => {
    const mockRepo: any = { create: jest.fn().mockResolvedValue(undefined) };
    const service = new CreateTransaction(mockRepo);

    const fakeTransaction: any = { toJson: () => ({ id: 'tx1', amount: 100 }) };

    await expect(service.execute(fakeTransaction)).resolves.toEqual({ id: 'tx1', amount: 100 });
    expect(mockRepo.create).toHaveBeenCalledWith(fakeTransaction);
  });

  it('should throw HttpException when repository fails', async () => {
    const mockRepo: any = { create: jest.fn().mockRejectedValue(new Error('fail')) };
    const service = new CreateTransaction(mockRepo);

    const fakeTransaction: any = { toJson: () => ({ id: 'tx1' }) };

    await expect(service.execute(fakeTransaction)).rejects.toBeInstanceOf(HttpException);
  });
});
