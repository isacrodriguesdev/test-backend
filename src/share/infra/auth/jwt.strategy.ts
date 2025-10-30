import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Authenticator } from 'src/domain/cryptography/Authenticator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY!,
    });
  }

  async validate(payload: any) {
    // Aqui você pode adicionar lógica extra (ex: verificar user no DB)
    // Retorna o payload decodificado para o request.user
    return payload;
  }
}
