// users.service.ts
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { CreateUserDto } from '@app/contracts/users/user.dto';
import { User } from '@app/contracts/users/entity/users.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private kafkaClient: ClientKafka,
  ) {}

  async findAll() {
    return await firstValueFrom(
      this.kafkaClient.send('findAll', {}).pipe(timeout(5000)),
    );
  }

  create(createUserDto: CreateUserDto) {
    this.kafkaClient.emit('order_create', createUserDto);
    console.log('Received from users microservice:');
    // return result;
  }

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('get_user');
    await this.kafkaClient.connect();
  }
  async findOneUser(email: string): Promise<User> {
    console.log('Sending email to get_user topic:', email);

    return await firstValueFrom(
      this.kafkaClient.send<User>('get_user', email).pipe(timeout(5000)),
    );
  }

}
