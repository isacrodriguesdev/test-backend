import { User } from "src/domain/entities/User";

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}