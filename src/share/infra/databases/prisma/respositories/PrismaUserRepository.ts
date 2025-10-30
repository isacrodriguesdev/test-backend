import { PrismaService } from "src/database/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/User";
import { UserRepository } from "src/domain/repositories/UserResository";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.password,
        createdAt: user.createdAt,
      },
    });

    return new User(
      {
        name: created.name,
        email: created.email,
        password: created.passwordHash,
        createdAt: created.createdAt,
      },
      created.id,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!found) {
      return null;
    }

    return new User(
      {
        name: found.name,
        email: found.email,
        password: found.passwordHash,
        createdAt: found.createdAt,
      },
      found.id,
    );
  }
}