import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Authenticator } from "src/domain/cryptography/Authenticator";
import { EncryptedPassword } from "src/domain/cryptography/EncryptedPassword";
import { User } from "src/domain/entities/User";
import { UserRepository } from "src/domain/repositories/UserResository";

@Injectable()
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptedPassword: EncryptedPassword,
    private readonly authenticator: Authenticator,
  ) { }

  async execute(user: User) {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Unable to register user.',
      }, HttpStatus.BAD_REQUEST);
    }

    const password = await this.encryptedPassword.encrypt(user.password);
    user.setPassword(password);

    await this.userRepository.create(user);

    const token = await this.authenticator.sign({
      id: user.id,
      email: user.email,
    });

    return { user: user.toJson(), token };

  }
}