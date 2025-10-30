// Mock the UserMapper so controller logic doesn't import heavy domain code
jest.mock('src/share/infra/mappers/UserMapper', () => ({
  UserMapper: { fromDTO: (dto: any) => ({ ...dto }) },
}));

import { UserController } from '../src/controllers/user.controller';

describe('UserController (e2e minimal)', () => {
  it('register should call RegisterUser.execute and return token', async () => {
    const mockRegister: any = { execute: jest.fn().mockResolvedValue({ user: { id: '1' }, token: 't' }) };
    const mockLogin: any = { execute: jest.fn().mockResolvedValue({ user: { id: '1' }, token: 't' }) };

    const controller = new UserController(mockRegister, mockLogin as any);

    const result = await controller.register({ name: 'a', email: 'a@b.com', password: 'p' } as any);
    expect(result).toHaveProperty('token');
    expect(mockRegister.execute).toHaveBeenCalled();
  });

  it('login should call LoginUser.execute and return token', async () => {
    const mockRegister: any = { execute: jest.fn() };
    const mockLogin: any = { execute: jest.fn().mockResolvedValue({ user: { id: '1' }, token: 't' }) };

    const controller = new UserController(mockRegister, mockLogin as any);

    const result = await controller.login({ email: 'a@b.com', password: 'p' } as any);
    expect(result).toHaveProperty('token');
    expect(mockLogin.execute).toHaveBeenCalledWith('a@b.com', 'p');
  });
});
