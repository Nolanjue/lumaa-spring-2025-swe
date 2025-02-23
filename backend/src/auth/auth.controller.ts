import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string },
  @Res({ passthrough: true }) res: Response) {
    return this.authService.register(body.username, body.password, res);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string },
  @Res({ passthrough: true }) res: Response) {
    return this.authService.login(body.username, body.password, res);
  }

  @Post('logout')
  logout(body: { username: string; password: string },
  @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}