import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/share/infra/auth/jwt-auth.guard';

describe('Transaction (e2e)', () => {
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

  // map
  it('GET /api/transaction with chartType=map', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/transaction?startDate=2025-01-01&endDate=2025-12-31')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('userId');
      expect(res.body[0]).toHaveProperty('type');
      expect(res.body[0]).toHaveProperty('category');
      expect(res.body[0]).toHaveProperty('amount');
      expect(res.body[0]).toHaveProperty('date');
    }
  });

  it('GET /api/transaction with chartType=pie', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/transaction?chartType=pie&startDate=2025-01-01&endDate=2025-12-31')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('label');
      expect(res.body[0]).toHaveProperty('value');
    }
  });

  it('GET /api/transaction with chartType=line', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/transaction?chartType=line&startDate=2025-01-01&endDate=2025-12-31')
      .expect(200);

    expect(res.body).toHaveProperty('labels');
    expect(res.body).toHaveProperty('datasets');
  });
});