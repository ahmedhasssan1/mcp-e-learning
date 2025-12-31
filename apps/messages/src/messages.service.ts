import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
import { Messages } from 'libs/messages/entity/messgaes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages) private MessageRepo: Repository<Messages>,
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
