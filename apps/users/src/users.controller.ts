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
  @EventPattern('users.create')
  async create( createUSer: CreateUserDto) {
    console.log('debugging ',createUSer);
    
  }
}
