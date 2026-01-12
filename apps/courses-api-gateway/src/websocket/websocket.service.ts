import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import {
  createMessageDto,
  savedMwssage,
} from 'libs/messages/dto/createMessaga.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { WebsocketGateway } from './websocket.gateway';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WebsocketService implements OnModuleInit {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private kafkaClient: ClientKafka,
    private readonly wsGateway: WebsocketGateway,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_message');
    await this.kafkaClient.connect();
  }
  async createMessage(createMessage: createMessageDto, token: any) {
    try {
      if (!token) {
        throw new Error('Token is required');
      }

      const verifytoken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_PASS'),
      });

      const userId = Number(verifytoken.sub);
      console.log('Verified token:', verifytoken);
      console.log('User ID:', userId, 'Type:', typeof userId);

      if (isNaN(userId)) {
        throw new Error('Invalid user ID from token');
      }

      const message: savedMwssage = {
        authorId: userId,
        content: createMessage.content,
        conversationId: createMessage.conversationId,
      };

      console.log('Message to send:', message);

      const NewMessage = await firstValueFrom(
        this.kafkaClient.send('create_message', message).pipe(timeout(5000)),
      );
      console.log('Received response from Kafka:', NewMessage);

      await this.wsGateway.sendMessage(message);
      return NewMessage;
    } catch (err) {
      console.error('Error in createMessage:', err.message);
      throw err;
    }
  }
}
