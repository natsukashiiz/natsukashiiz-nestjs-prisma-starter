import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignHistoryService } from './../sign-history/sign-history.service';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';
import { JwtStrategy } from './jwt.strategy';
import { SignIn, SignUp, TokenPayload, TokenResponse } from './auth.model';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private signHistoryService: SignHistoryService,
    private jwt: JwtService,
    private redis: RedisService,
    private jwtStrategy: JwtStrategy,
  ) {}

  private getUserAgent(http: Request): string {
    return http.headers['user-agent'];
  }

  private getDevice(userAgent: string): string {
    let device = 'Unknown';

    if (userAgent.match(/Android/i)) {
      device = 'Android';
    } else if (userAgent.match(/BlackBerry/i)) {
      device = 'BlackBerry';
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      device = 'iOS';
    } else if (userAgent.match(/Opera Mini/i)) {
      device = 'Opera Mini';
    } else if (userAgent.match(/IEMobile/i)) {
      device = 'IEMobile';
    }

    return device;
  }

  private async createToken(
    user: Prisma.UserWhereUniqueInput,
    http: Request,
    ip: string,
  ): Promise<TokenResponse> {
    const ua = this.getUserAgent(http);
    const device = this.getDevice(ua);

    await this.signHistoryService.create({
      uid: user.id,
      ua: ua,
      ip: ip,
      device: device,
    });

    const uuid = randomUUID().toString().replaceAll('-', '');
    const accessToken = this.jwtStrategy.generateToken({
      sub: uuid,
      uid: user.id,
      name: user.name as string,
      email: user.email,
      avatar: user.avatar as string,
      secret: process.env.JWT_ACCESS_SECRET_KEY,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = this.jwtStrategy.generateToken({
      refId: uuid,
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    const payload = this.jwt.decode(accessToken) as TokenPayload;
    const expiresIn = payload.exp;
    const timeout = (expiresIn - Math.floor(Date.now() / 1000)) * 1000;

    await this.redis.set(RedisService.TOKEN + user.id, uuid, timeout);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(body: SignIn, http: Request, ip: string) {
    const user = await this.usersService.findByEmail(body.email, true);

    if (!user) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Email or password is incorrect');
    }

    // const loggedIn = await this.redis.get(RedisService.TOKEN + user.id);
    // if (loggedIn) {
    //   throw new BadRequestException('User already logged in');
    // }

    return await this.createToken(user, http, ip);
  }

  async signUp(body: SignUp, http: Request, ip: string) {
    const hasEmail = await this.usersService.findByEmail(body.email);

    if (hasEmail) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.usersService.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return await this.createToken(user, http, ip);
  }
}
