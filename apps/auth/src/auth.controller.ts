import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from '@app/contracts/users/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @MessagePattern("get_user")
  // async login(@Payload() email:string){
  //   console.log('logg th auth service');
  
  //   return this.authService.userExist(email);
  // }
}
