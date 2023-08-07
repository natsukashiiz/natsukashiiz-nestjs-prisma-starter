import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  name: string;
}
