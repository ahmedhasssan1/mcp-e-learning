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
import { ClientProxy, Payload } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(QueueName.KAFKA_SERVICE) private usersClient: ClientProxy,
  @InjectRepository(User) private readonly userRepo:Repository<User>
) {}

  findAll() {
    return 'asasf';
  }

  async create(@Payload() createUserDto:CreateUserDto) {
    const newUser=this.userRepo.create( createUserDto)
    await this.userRepo.save(newUser);
   await this.usersClient.emit('user.created', newUser);
    return 'user created';
  }
}
