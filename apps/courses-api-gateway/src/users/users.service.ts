// users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka, ClientProxy, EventPattern } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';

@Injectable()
export class UsersService {
  constructor(@Inject(QueueName.KAFKA_SERVICE) private userClient: ClientKafka) {}

  async findAll() {
    return await firstValueFrom(
      this.userClient.send('findAll', {}).pipe(timeout(5000)),
    );
  }

  @EventPattern("users.created")
  async create(createUserDto: any) {
    console.log('debugging from service gateay');
    this.userClient.emit("order_create",createUserDto);
    return {message:"order send to kafka"}

  }
}
