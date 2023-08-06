import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from 'src/users/dto/users-dto';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';

@Controller('/v1/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@Auth() auth: User) {
    return this.profileService.self(auth);
  }

  @Patch()
  update(@Auth() auth: User, @Body() body: UpdateUserDto) {
    return this.profileService.update(auth, body);
  }
}
