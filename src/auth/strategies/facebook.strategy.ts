import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

export interface GoogleUser {
  userId: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:9000/v1/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { id, name, picture, email } = profile._json;

    const user: GoogleUser = {
      userId: id,
      email: email,
      name: name,
      picture: picture.data.url,
      accessToken,
    };

    done(null, user);
  }
}
