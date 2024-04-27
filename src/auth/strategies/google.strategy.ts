import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export interface GoogleUser {
  userId: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:9000/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: VerifyCallback,
  ): Promise<any> {
    const { id, emails, photos } = profile;
    const { givenName, familyName } = profile.name || {};

    const user: GoogleUser = {
      userId: id,
      email: emails[0].value,
      name: `${givenName} ${familyName}`,
      picture: photos[0].value,
      accessToken,
    };

    cb(null, user);
  }
}
