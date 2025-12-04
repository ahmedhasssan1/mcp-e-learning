import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.findAll')
  getHello() {
    return this.usersService.getHello();
  }
  @MessagePattern("createUser")
  async create(){
    return await this.usersService.create()
  }
}
