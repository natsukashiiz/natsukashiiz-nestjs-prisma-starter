export class AuthEntity {
  accessToken: string;
  refreshToken: string;
}

export class TokenPayload {
  sub: string;
  uid: number;
  name: string;
  email: string;
  avatar: string | null;
  iat: number;
  exp: number;
  iss: string;
}
