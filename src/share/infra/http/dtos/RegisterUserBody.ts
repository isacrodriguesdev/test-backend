import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserBody {
  @ApiProperty({ description: 'User full name', example: 'Isac Rodrigues' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User email address', example: 'isacrodriguesdev@protonmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: '$trongPassword123' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}