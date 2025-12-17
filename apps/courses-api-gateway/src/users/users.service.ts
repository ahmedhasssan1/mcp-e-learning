// users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { CreateUserDto } from '@app/contracts/users/user.dto';

@Injectable()
export class UsersService {
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

  login(email: string) {
    this.kafkaClient.emit('user_login', email);
    console.log('send email to userlogin ropic');
  }
}
