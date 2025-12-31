import { Module } from '@nestjs/common';
import { CoursesApiGatewayController } from './courses-api-gateway.controller';
import { CoursesApiGatewayService } from './courses-api-gateway.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { usersClientModule } from '../userssClients/users-clients.module';
import { MicroServiceName } from '../enums/constants';
import { QueueName } from '../enums/queue-name';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';

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
        },
      },
    ]),
    UsersModule,
    CoursesModule,
    AuthModule,
    WebsocketModule,
  ],
  controllers: [CoursesApiGatewayController],
  providers: [CoursesApiGatewayService],
})
export class CoursesApiGatewayModule {}
