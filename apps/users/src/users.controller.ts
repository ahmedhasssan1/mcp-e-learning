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

  @MessagePattern('order_create')
  async handleKafka(@Payload() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    console.log('debugging user adata  ', data);
    
  }
}
