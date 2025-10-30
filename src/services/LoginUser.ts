import { Authenticator } from "src/domain/cryptography/Authenticator";
import { EncryptedPassword } from "src/domain/cryptography/EncryptedPassword";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/UserResository";

export interface UserAuthenticationProps {
  email: string;
  password: string;
}

@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptedPassword: EncryptedPassword,
    private readonly authenticator: Authenticator,
  ) { }


  public async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordIsValid = await this.encryptedPassword.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }
    const token = await this.authenticator.sign({
      id: user.id,
      email: user.email,
    });

    return { user: user.toJson(), token };
  }
}