import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/contracts/users/login.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.AuthService.login(data);
    console.log('debugging get tokemnnnnn', token);

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 100,
    });
    return {token};
  }
}
