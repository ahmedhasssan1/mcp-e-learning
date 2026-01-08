import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
import { Messages } from 'libs/messages/entity/messgaes.entity';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private MessageRepo: Repository<Messages>,
    @Inject(QueueName.KAFKA_SERVICE) private messageClient:ClientKafka,
  ) {}
  async createMessage(createMessage: createMessageDto) {   
    const new_message = await this.MessageRepo.create({
      authorId: createMessage.authorId,
      content: createMessage.content,
      conversationId: createMessage.conversationId,
    });
    return await this.MessageRepo.save(createMessage);
  }
}
