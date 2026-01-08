import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { JwtModule } from '@nestjs/jwt';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleWare } from './ws.mw';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_PASS'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_PASS,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, WsJwtGuard],
  controllers: [AuthController],
  exports: [WsJwtGuard, AuthService],
})
export class AuthModule {}
