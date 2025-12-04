import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post()
 async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }
}
