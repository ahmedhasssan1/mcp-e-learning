import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { WebsocketGateway } from './websocket.gateway';

@Injectable()
export class WebsocketService implements OnModuleInit {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private kafkaClient: ClientKafka,
    private readonly wsGateway: WebsocketGateway,
  ) {}
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_message');
    await this.kafkaClient.connect();
  }
  async createMessage(createMessage: createMessageDto) {
    try {
      
      const NewMessage = await firstValueFrom(
        this.kafkaClient
          .send('create_message', createMessage)
          .pipe(timeout(5000)),
      );
      console.log(' Received response from Kafka:', NewMessage);

      await this.wsGateway.sendMessage(createMessage);
      return NewMessage;
    } catch (err) {
      console.log('catch error can not handle createmessage function');
    }
  }
}
