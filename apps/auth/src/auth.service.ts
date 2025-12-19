import { User } from '@app/contracts/users/entity/users.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { UsersService } from 'apps/users/src/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, // Fixed typo
    @Inject(QueueName.KAFKA_SERVICE) private readonly authClient: ClientKafka,
    @InjectRepository(User) private readonly userRepo: Repository<User>, // Fixed naming
  ) {}

  async userExist(email: string) {
    // Added async and return type
    const user = await this.userRepo.findOne({ where: { email } }); // Added await
    return user;
  }
}
