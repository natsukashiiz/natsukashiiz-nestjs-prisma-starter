import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/users-dto';
import { User } from '@prisma/client';
import { EventGateway } from 'src/gateway/events.gateway';

@Injectable()
export class ProfileService {
  constructor(
    private usersService: UsersService,
    private events: EventGateway,
  ) {}

  async self(auth: User) {
    return await this.usersService.findById(auth.id);
  }

  async update(auth: User, req: UpdateUserDto) {
    this.events.handleEvent('update:' + auth.id);
    return await this.usersService.update(auth.id, req);
  }
}
