import { Controller, Post, Body, Req, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth-dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signIn(signInDto, req, ip);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signUp(signUpDto, req, ip);
  }
}
