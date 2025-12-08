// users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CreateUserDto } from '@app/contracts/users/user.dto';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';

@Injectable()
export class UsersService {
  constructor(@Inject(QueueName.USER_QUEUE) private userClient: ClientProxy) {}

  async findAll() {
    return await firstValueFrom(
      this.userClient.send('findAll', {}).pipe(timeout(5000)),
    );
  }

  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(
      this.userClient.send('users.create', createUserDto).pipe(timeout(5000)),
    );
  }
}
