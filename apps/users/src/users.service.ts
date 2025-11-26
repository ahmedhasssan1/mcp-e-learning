import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHello() {
    return 'data from user appppp';
  }
}
