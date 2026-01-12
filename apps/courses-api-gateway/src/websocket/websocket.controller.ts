import { Body, Controller, Post, Req } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';

@Controller('websocket')
export class WebsocketController {
  constructor(private readonly webSocketService: WebsocketService) {}

  @Post('newMessgae')
  async newMessage(@Body() message: createMessageDto, @Req() req: any) {
    console.log('debugging request ', req);

    const token = req.headers.authorization;
    console.log('get token', token);

    return await this.webSocketService.createMessage(message, token);
  }
}
