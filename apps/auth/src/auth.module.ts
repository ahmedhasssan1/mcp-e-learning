import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { UsersModule } from 'apps/users/src/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/contracts/users/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: QueueName.KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth_consumer',
          },
        },
      },
    ]),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_PASS,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
