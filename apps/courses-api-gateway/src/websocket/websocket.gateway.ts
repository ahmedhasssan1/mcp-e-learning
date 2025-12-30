  import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
  import { Server } from 'socket.io';
  @WebSocketGateway()
  export class WebsocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      return 'Hello from websocketgatway';
    }
    SendMessage(messgae:createMessageDto) {
      this.server.emit('NewMessage', messgae);
    }
  }
