import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UserRequest implements Prisma.UserCreateInput {
  name: string;
  email: string;
  password: string;
}

export class UserUpdate implements Prisma.UserUpdateInput {
  @ApiProperty({
    description: 'Name of user',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  password?: string;

  @ApiProperty({
    description: 'Avatar of user',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  avatar?: string;
}

export class UserResponse implements Prisma.UserUpdateInput {
  id: number;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  cdt?: string | Date;
}
