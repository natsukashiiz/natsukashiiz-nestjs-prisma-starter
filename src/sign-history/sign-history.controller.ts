import { Controller } from '@nestjs/common';
import { SignHistoryService } from './sign-history.service';

@Controller('sign-history')
export class SignHistoryController {
  constructor(private readonly signHistoryService: SignHistoryService) {}
}
