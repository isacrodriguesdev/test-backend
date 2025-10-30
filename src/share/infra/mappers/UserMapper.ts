import { User } from "src/domain/entities/User";

export class UserMapper {
  static toDTO(user: User): any {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static fromDTO(dto: any): User {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }
}