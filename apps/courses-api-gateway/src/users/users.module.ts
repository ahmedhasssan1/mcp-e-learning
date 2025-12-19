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
        name: QueueName.KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user_consumer',
          },
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
