import { Injectable } from '@nestjs/common';
import CommonUtils from 'src/utils/CommonUtils';
import ResultUtils, { Result } from 'src/utils/ResultUtils';
import { SignInDto, SignUpDto } from './dto/auth-dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity, TokenPayload } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignHistoryService } from './../sign-history/sign-history.service';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private signHistoryService: SignHistoryService,
    private jwt: JwtService,
    private redis: RedisService,
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
  ): Promise<AuthEntity> {
    const ua = this.getUserAgent(http);
    const device = this.getDevice(ua);

    await this.signHistoryService.create({
      uid: user.id,
      ua: ua,
      ip: ip,
      device: device,
    });

    const sub = randomUUID();

    const token = this.jwt.sign({
      sub: sub,
      uid: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });

    const payload = this.jwt.decode(token) as TokenPayload;
    const expiresIn = payload.exp;
    const timeout = (expiresIn - Math.floor(Date.now() / 1000)) * 1000;

    await this.redis.set(RedisService.TOKEN + user.id, sub, timeout);

    return {
      token,
    };
  }

  async signIn(
    req: SignInDto,
    http: Request,
    ip: string,
  ): Promise<Result<AuthEntity>> {
    if (CommonUtils.isEmpty(req.email)) {
      return ResultUtils.error('Email is required');
    }

    if (CommonUtils.isEmpty(req.password)) {
      return ResultUtils.error('Password is required');
    }

    const user = await this.usersService.findByEmail(req.email, true);

    if (!user) {
      return ResultUtils.error('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(req.password, user.password);

    if (!isPasswordValid) {
      return ResultUtils.error('Email or password is incorrect');
    }

    const loggedIn = await this.redis.get(RedisService.TOKEN + user.id);
    if (loggedIn) {
      return ResultUtils.error('User already logged in');
    }

    return ResultUtils.success(await this.createToken(user, http, ip));
  }

  async signUp(
    req: SignUpDto,
    http: Request,
    ip: string,
  ): Promise<Result<AuthEntity>> {
    if (CommonUtils.isEmpty(req.email)) {
      return ResultUtils.error('Email is required');
    }

    if (CommonUtils.isEmpty(req.password)) {
      return ResultUtils.error('Password is required');
    }

    const hasEmail = await this.usersService.findByEmail(req.email);

    if (hasEmail) {
      return ResultUtils.error('Email already exists');
    }

    const user = await this.usersService.create({
      name: req.name,
      email: req.email,
      password: req.password,
    });

    return ResultUtils.success(await this.createToken(user, http, ip));
  }
}
