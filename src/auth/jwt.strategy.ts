import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './entities/auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private redis: RedisService,
    private jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { uid: number }) {
    const user = await this.usersService.findById(payload.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    const loggedIn = await this.redis.get(RedisService.TOKEN + user.id);
    if (!loggedIn) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async verify(token: string) {
    const decoded = this.jwt.decode(token) as TokenPayload;
    if (!decoded) {
      Logger.log('JwtStrategy-[verify](invalid token).');
      return false;
    }

    decoded.exp = decoded.exp * 1000;
    if (decoded.exp < Date.now()) {
      Logger.log(`JwtStrategy-[verify](token expired). token:${token}}`);
      return false;
    }

    try {
      await this.jwt.verify(token);
      return true;
    } catch (error) {
      Logger.log(`JwtStrategy-[verify]. token:${token}, error:${error}`);
      return false;
    }
  }
}
