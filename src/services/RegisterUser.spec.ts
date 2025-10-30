import { RegisterUser } from './RegisterUser';

describe('RegisterUser', () => {
  it('should return error when user exists', async () => {
    const existingUser = { id: 'u1', email: 'a@b.com' };
    const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(existingUser) };
    const service = new RegisterUser(mockRepo, {} as any, {} as any);

    const result = await service.execute({ email: 'a@b.com', password: 'p', toJson: () => ({}) } as any);
    expect(result).toHaveProperty('error');
  });

  it('should create user and return token on success', async () => {
    const mockRepo: any = { findByEmail: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue(undefined) };
    const mockEncrypted: any = { encrypt: jest.fn().mockResolvedValue('hashed') };
    const mockAuth: any = { sign: jest.fn().mockResolvedValue('token') };
    const service = new RegisterUser(mockRepo, mockEncrypted, mockAuth);

    const user: any = { id: 'u2', email: 'b@b.com', password: 'p', setPassword: function(p: any) { this.password = p }, toJson: () => ({ id: 'u2' }) };

    const result = await service.execute(user);
    expect(result).toHaveProperty('token', 'token');
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
