import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { EventGateway } from 'src/gateway/events.gateway';
import { UserUpdate } from 'src/users/users.model';

@Injectable()
export class ProfileService {
  constructor(
    private usersService: UsersService,
    private events: EventGateway,
  ) {}

  async self(auth: User) {
    return await this.usersService.findById(auth.id);
  }

  async update(auth: User, req: UserUpdate) {
    this.events.handleEvent('update:' + auth.id);
    return await this.usersService.update(auth.id, req);
  }
}
