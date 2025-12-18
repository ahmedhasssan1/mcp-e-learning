import { LoginDto } from '@app/contracts/users/login.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { UsersService } from 'apps/users/src/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UsersService,
    @Inject(QueueName.KAFKA_SERVICE) private readonly authClient: ClientKafka,
  ) {}

  userExist(email: string) {
    const user_exist=this.authClient.send("user_login",email);
    return user_exist

  }
}
