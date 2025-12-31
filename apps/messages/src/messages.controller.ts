import { Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @MessagePattern('create_message')
  async NewMessgae(@Payload() message: createMessageDto) {
    return await this.messagesService.createMessage(message);
  }
}
