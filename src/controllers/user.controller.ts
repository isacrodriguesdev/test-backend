import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUser } from "src/services/LoginUser";
import { RegisterUser } from "src/services/RegisterUser";
import { LoginUserBody } from "src/share/infra/http/dtos/LoginUserBody";
import { UserMapper } from "src/share/infra/mappers/UserMapper";

@ApiTags('user')
@Controller("api/user")
export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
  ) { }

  @Post("register")
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User created and token returned' })
  async register(@Body() user: any) {
    return this.registerUser.execute(
      UserMapper.fromDTO(user)
    );
  }

  @Post("login")
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User authenticated and token returned' })
  async login(@Body() user: LoginUserBody) {
    return this.loginUser.execute(user.email, user.password);
  }
}