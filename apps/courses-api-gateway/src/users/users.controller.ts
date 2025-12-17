// users.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/user.dto';
import { LoginDto } from '@app/contracts/users/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    return 'user created succesffully';
  }
  @Post('Login')
  Login(@Body() login: LoginDto) {
    const { email } = login;
    console.log('debugging  login in con',email);
    
    this.usersService.login(email);
  }
}
