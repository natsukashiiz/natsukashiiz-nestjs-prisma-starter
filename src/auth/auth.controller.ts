import {
  Controller,
  Post,
  Body,
  Req,
  Ip,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn, SignUp, TokenResponse } from './auth.model';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';

@Controller('/v1/auth')
@ApiTags('Authentication')
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiBody({ type: SignIn })
  @ApiCreatedResponse({
    description: 'The user has been successfully logged in.',
    type: TokenResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user does not exist or the password is incorrect.',
  })
  signIn(@Body() body: SignIn, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signIn(body, req, ip);
  }

  @Post('/signup')
  @ApiBody({ type: SignUp })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    type: TokenResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user already exists or the password is incorrect.',
  })
  signUp(@Body() body: SignUp, @Req() req: Request, @Ip() ip: string) {
    return this.authService.signUp(body, req, ip);
  }

  // google login
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  googleAuth() {
    // google oauth process
  }

  @ApiExcludeEndpoint()
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  googleAuthRedirect(@Req() req: any, @Ip() ip: string) {
    return this.authService.googleAuth(req, ip);
  }

  // facebook login
  @UseGuards(FacebookAuthGuard)
  @Get('/facebook')
  facebookAuth() {
    // facebook oauth process
  }

  @ApiExcludeEndpoint()
  @UseGuards(FacebookAuthGuard)
  @Get('/facebook/callback')
  facebookAuthRedirect(@Req() req: any, @Ip() ip: string) {
    return this.authService.facebookAuth(req, ip);
  }
}
