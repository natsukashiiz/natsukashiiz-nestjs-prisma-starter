import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SignHistoryService } from './sign-history.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Pagination } from 'src/pagination/pagination.model';

@Controller('sign-history')
@UseGuards(JwtAuthGuard)
@ApiTags('Sign History')
@ApiBearerAuth()
@ApiInternalServerErrorResponse({
  description: 'Internal server error.',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class SignHistoryController {
  constructor(private readonly signHistoryService: SignHistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get sign history' })
  @ApiOkResponse({
    description: 'Get sign history successfully',
  })
  findAll(@Query() params: Pagination, @Auth() auth: User) {
    return this.signHistoryService.findByUidAndPagination(auth.id, params);
  }
}
