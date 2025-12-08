import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersClientsModule } from 'apps/courses-api-gateway/userssClients/users-clients.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServiceName } from 'apps/courses-api-gateway/enums/constants';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: QueueName.USER_QUEUE,
        transport: Transport.REDIS,
        options: {
          host: '192.168.116.128',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
