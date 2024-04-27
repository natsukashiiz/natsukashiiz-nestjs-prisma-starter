import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { UserUpdate } from 'src/users/users.model';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('/v1/profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Profile')
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get profile successfully',
  })
  get(@Auth() auth: User) {
    return this.profileService.self(auth);
  }

  @Patch()
  @ApiOperation({ summary: 'Update profile' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Update profile successfully',
  })
  update(@Auth() auth: User, @Body() body: UserUpdate) {
    return this.profileService.update(auth, body);
  }
}
