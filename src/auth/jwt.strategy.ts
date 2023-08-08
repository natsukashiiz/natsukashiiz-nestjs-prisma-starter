import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private redis: RedisService,
    private jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET_KEY,
    });
  }

  generateToken(data: {
    sub?: string;
    uid?: number;
    name?: string;
    email?: string;
    avatar?: string;
    refId?: string;
    secret: string;
    expiresIn: string;
  }): string {
    return this.jwt.sign(
      {
        sub: data.sub,
        uid: data.uid,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        refId: data.refId,
      },
      {
        secret: data.secret,
        expiresIn: data.expiresIn,
        algorithm: 'HS256',
        issuer: process.env.JWT_ISSUER,
      },
    );
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
      await this.jwt.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
      });
      const user = this.validate(decoded);
      if (!user) {
        Logger.log(`JwtStrategy-[verify](invalid user). token:${token}`);
        return false;
      }
      return true;
    } catch (error) {
      Logger.log(
        `JwtStrategy-[verify](unknown). token:${token}, error:${error}`,
      );
      return false;
    }
  }
}
