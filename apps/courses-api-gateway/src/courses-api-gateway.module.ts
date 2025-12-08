import { Module } from '@nestjs/common';
import { CoursesApiGatewayController } from './courses-api-gateway.controller';
import { CoursesApiGatewayService } from './courses-api-gateway.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { usersClientModule } from '../userssClients/users-clients.module';
import { MicroServiceName } from '../enums/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'users_service',
        transport: Transport.REDIS,
        options: {
          host: '192.168.116.128',
          port: 6379,
        },
      },
      {
        name: MicroServiceName.COURSESSERVICES,
        transport: Transport.REDIS,
        options: {
          host: '192.168.116.128',
          port: 6379,
        },
      },
    ]),
    UsersModule,
    CoursesModule,
  ],
  controllers: [CoursesApiGatewayController],
  providers: [CoursesApiGatewayService],
})
export class CoursesApiGatewayModule {}
