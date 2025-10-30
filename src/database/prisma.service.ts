import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import * as path from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Resolve relative SQLite paths at runtime so `.env` can remain portable
    const envUrl = process.env.DATABASE_URL;
    if (envUrl && envUrl.startsWith('file:')) {
      const filePath = envUrl.slice('file:'.length);
      if (filePath && !path.isAbsolute(filePath)) {
        const abs = path.resolve(process.cwd(), filePath);
        process.env.DATABASE_URL = `file:${abs}`;
      }
    }
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}