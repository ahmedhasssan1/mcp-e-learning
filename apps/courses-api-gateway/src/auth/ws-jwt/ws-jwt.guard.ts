import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<booleand> {
    const client: Socket = context.switchToWs().getClient();
    const auth = client.handshake.headers.authorization;
    console.log('debugging from canacrive ', auth);

    if (!auth) return false;

    // return true;
    // const token2 = authorization.split(' ')[0];
    // console.log('Extracted token:', auth);
    // console.log('Extracted token:', token2);

    return this.validateToken(auth);

    // ✅ attach user to socket
    // client.data.user = payload;

    // return true;
  }

  private async validateToken(token: any) {
    console.log('from validate token debugging ');

    const verfiy = await this.authService.verfiytoken(token);
    // console.log('tokeen', token);
    if (!token) {
      console.log('debugging no conect allowes');
      return false;
    }
    return true;
  }
}
