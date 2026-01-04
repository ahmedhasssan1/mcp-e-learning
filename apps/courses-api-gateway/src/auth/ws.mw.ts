import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';

export type SocketIoMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleWare = (): SocketIoMiddleWare => {
  return (client, next) => {
    try {
      const authHeader = client.handshake.headers.authorization;

      console.log('debugging  from middle ware', authHeader);
      if (!authHeader) {
        console.log('❌ No authorization header');
        return next(new Error('No authorization token'));
      }
      const to = authHeader.split(' ')[1];
      WsJwtGuard.validateToken(to);
      next();
    } catch (err) {
      console.log('catch error ', err);
    }
  };
};
