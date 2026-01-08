import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createMessageDto } from 'libs/messages/dto/createMessaga.dto';
import { SocketAuthMiddleWare } from '../auth/ws.mw';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  afterInit(server: Server) {
    console.log(' WebSocket Gateway initialized');

    server.use(SocketAuthMiddleWare(this.authService));

    console.log(' Authentication middleware applied');
  }

  handleConnection(client: Socket) {
    const user = client.data.user;
    console.log(' Client connected:', client.id);
    console.log('User:', user?.sub || user?.userId);
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    console.log(' Client disconnected:', client.id);
    console.log('User was:', user?.sub || user?.userId);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    const user = client.data.user;

    console.log('Message received from user:', user?.sub, payload);

    return 'Hello from websocket gateway';
  }

  sendMessage(message: createMessageDto) {
    console.log(' Broadcasting message:', message);
    this.server.emit('NewMessage', message);
    return 'from ws  server';
  }

  sendMessageToUser(userId: string, message: createMessageDto) {
    this.server.to(userId).emit('NewMessage', message);
  }

  sendMessageToRoom(roomId: string, message: createMessageDto) {
    this.server.to(`room-${roomId}`).emit('NewMessage', message);
  }
}
