import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleWare } from '../auth/ws.mw';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt/ws-jwt.guard';
@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    console.log('debugging ', client);
    client.use(SocketAuthMiddleWare() as any);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello from websocketgatway';
  }
  SendMessage(messgae: createMessageDto) {
    this.server.emit('NewMessage', messgae);
  }
}
