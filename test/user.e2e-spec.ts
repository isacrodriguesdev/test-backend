import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/share/infra/auth/jwt-auth.guard';

describe('User (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /api/user/register', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/user/register')
      .send({
        name: 'Example User',
        email: 'example@example.com',
        password: '$trongPassword123',
      });

    expect([201, 400]).toContain(res.status);
  });

  it('GET /api/user/login', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/user/login')
      .send({
        email: 'example@example.com',
        password: '$trongPassword123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    // user properties
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('name');
    expect(res.body.user).toHaveProperty('email');
    expect(res.body.user).not.toHaveProperty('password');
    // token
    expect(res.body).toHaveProperty('token');
  });
});