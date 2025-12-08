import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/contracts/users/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('findAll')
  getHello() {
    return this.usersService.findAll();
  }
  @MessagePattern('users.create')
  async create(createUSer: any) {
    console.log('debugging ', createUSer);
    await this.usersService.create(createUSer);
    return 'user created';
  }
}
