import { LoginUser } from './LoginUser';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUser', () => {
  it('should throw when user not found', async () => {
    const mockUserRepo: any = { findByEmail: jest.fn().mockResolvedValue(null) };
    const service = new LoginUser(mockUserRepo, {} as any, {} as any);

    await expect(service.execute('a@b.com', 'pass')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw when password invalid', async () => {
    const mockUser = { id: 'u1', email: 'a@b.com', password: 'hash', toJson: () => ({ id: 'u1' }) };
    const mockUserRepo: any = { findByEmail: jest.fn().mockResolvedValue(mockUser) };
    const mockEncrypted: any = { compare: jest.fn().mockResolvedValue(false) };
    const service = new LoginUser(mockUserRepo, mockEncrypted, {} as any);

    await expect(service.execute('a@b.com', 'pass')).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
