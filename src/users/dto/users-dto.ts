class BaseUserDto {
  name: string;
  password: string;
}

export class CreateUserDto extends BaseUserDto {
  email: string;
}

export class UpdateUserDto extends BaseUserDto {
  avatar: string;
}
