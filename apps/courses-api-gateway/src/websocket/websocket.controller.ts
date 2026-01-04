import { Body, Controller, Post } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';

@Controller('websocket')
export class WebsocketController {
  constructor(private readonly webSocketService: WebsocketService) {}
  
  @Post('newMessgae')
  async newMessage(@Body() message: createMessageDto) {
    return await this.webSocketService.createMessage(message);
  }
}
