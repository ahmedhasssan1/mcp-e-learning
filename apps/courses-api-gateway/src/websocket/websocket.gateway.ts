import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from "socket.io"
@WebSocketGateway()
export class WebsocketGateway {

  @WebSocketServer()
  server:Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello from websocketgatway';
  }
  SendMessage(){
    this.server.emit("NewMessage",'hello from the server')
  }
  
}
