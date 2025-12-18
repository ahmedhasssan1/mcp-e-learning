import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from '@app/contracts/users/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("login")
  async login(@Payload() Login:LoginDto){
    const {email,password}=Login
    const user_exist=await this.authService.userExist(email)
  }
}
