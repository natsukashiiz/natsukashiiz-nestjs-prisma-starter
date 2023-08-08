import { Controller, Post, Body, Req, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, SignUp } from './auth.model';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/v1/auth')
@ApiTags('Authentication')
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SignIn })
  @ApiCreatedResponse({
    description: 'The user has been successfully logged in.',
  })
  @ApiBadRequestResponse({
    description: 'The user does not exist or the password is incorrect.',
  })
  signIn(@Body() body: SignIn, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signIn(body, req, ip);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignUp })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
  })
  @ApiBadRequestResponse({
    description: 'The user already exists or the password is incorrect.',
  })
  signUp(@Body() body: SignUp, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signUp(body, req, ip);
  }
}
