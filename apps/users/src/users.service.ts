import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/contracts/users/user.dto';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(QueueName.USER_QUEUE) private usersClient: ClientProxy) {}

  findAll() {
    return 'asasf';
  }

  async create(createUserDto: any) {
    await this.usersClient.emit('user.created',createUserDto);
    return 'user created';
  }
}
