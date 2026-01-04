import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { WsJwtGuard } from '../auth/ws-jwt/ws-jwt.guard';

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
            groupId: 'message_consumer',
          },
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_PASS,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  providers: [
    WebsocketGateway,
    WebsocketService,
    {
      provide: APP_GUARD,
      useClass: WsJwtGuard,
    },
  ],

  controllers: [WebsocketController],
})
export class WebsocketModule {}
