import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';
import { AuthService } from './auth.service';

export type SocketIoMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleWare = (authService:AuthService): SocketIoMiddleWare => {
  return async(client, next) => {
    try {
      const authHeader = client.handshake.headers.authorization;
      console.log('debugging  from middle ware', authHeader);
      if (!authHeader) {
        console.log('❌ No authorization header');
        return next(new Error('No authorization token'));
      }
      const to = authHeader.split(' ')[1];
      await authService.verfiytoken(to)
      WsJwtGuard.validateToken(to);
      next();
    } catch (err) {
      console.log('catch error ', err);
    }
  };
};
