import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { LoginUser } from "src/services/LoginUser";
import { RegisterUser } from "src/services/RegisterUser";
import { UserMapper } from "src/share/infra/mappers/UserMapper";

@Controller("api/user")
export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
  ) { }

  @Post("register")
  async register(@Body() user: any) {
    return this.registerUser.execute(
      UserMapper.fromDTO(user)
    );
  }

  @Post("login")
  async login(@Body() user: any) {
    return this.loginUser.execute(user.email, user.password);
  }
}