// users.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  @Get('profile')
  async getUser(@Query('email') email: string) {
    console.log('debugging login in con', email);
    return await this.usersService.findOneUser(email);
  }
}
