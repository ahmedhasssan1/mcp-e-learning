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

  @EventPattern('order_create')
  async handleKafka(@Payload() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    console.log('User created from Kafka event:', data);
  }

  @MessagePattern('get_user')
  async getUserByEmail(email: string) {
    console.log('Kafka received email:', email);

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return 'nooooores'; // Kafka will send null if user not found
    }

    const { password, ...safeUser } = user; // remove password
    return safeUser; // ✅ THIS RETURN IS REQUIRED
  }
}
