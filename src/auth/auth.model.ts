import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignIn implements Prisma.UserUpdateInput {
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    maxLength: 50,
  })
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  })
  password: string;
}

export class SignUp extends SignIn implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    required: true,
    minLength: 4,
    maxLength: 15,
  })
  name: string;
}

export class TokenResponse {
  @ApiProperty({
    description: 'Access Token of the user',
    type: String,
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh Token of the user',
    type: String,
    required: true,
  })
  refreshToken: string;
}

export class TokenPayload {
  sub: string;
  uid: number;
  email: string;
  avatar: string;
  iat: number;
  exp: number;
}
