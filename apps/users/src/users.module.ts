import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entity/users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
