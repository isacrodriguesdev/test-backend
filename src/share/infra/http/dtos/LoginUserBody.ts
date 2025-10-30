import { IsNotEmpty, IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUserBody {
  @ApiProperty({ description: 'User email address', example: 'isacrodriguesdev@protonmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'test123' })
  @IsNotEmpty()
  password: string;
}