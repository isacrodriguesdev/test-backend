import { Authenticator } from "src/domain/cryptography/Authenticator";
import { EncryptedPassword } from "src/domain/cryptography/EncryptedPassword";
import { BcryptEncryption } from "src/share/infra/cryptography/bcrypt/BcryptEncryption";
import { JsonWebTokenService } from "src/share/infra/cryptography/jsonwebtoken/JsonWebTokenService";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: EncryptedPassword,
      useClass: BcryptEncryption,
    },
    {
      provide: Authenticator,
      useClass: JsonWebTokenService,
    },
  ],
  exports: [EncryptedPassword, Authenticator],
})
export class CryptographyModule { }