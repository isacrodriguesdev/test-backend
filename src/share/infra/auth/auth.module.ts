import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/share/infra/auth/jwt.strategy';
import { CryptographyModule } from 'src/share/infra/cryptography/cryptography.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), CryptographyModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
