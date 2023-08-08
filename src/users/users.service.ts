import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRequest, UserResponse, UserUpdate } from './users.model';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserResponse[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        cdt: true,
      },
    });
  }

  async findById(id: number, password = false): Promise<UserResponse> {
    return await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: password,
        cdt: true,
      },
    });
  }

  async findByEmail(email: string, password = false): Promise<UserResponse> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: password,
        cdt: true,
      },
    });
  }

  async create(req: UserRequest, password = false): Promise<UserResponse> {
    req.password = await bcrypt.hash(req.password, roundsOfHashing);
    return await this.prisma.user.create({
      data: req,
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: password,
        cdt: true,
      },
    });
  }

  async update(
    id: number,
    req: UserUpdate,
    password = false,
  ): Promise<UserResponse> {
    if (req.password) {
      req.password = await bcrypt.hash(req.password, roundsOfHashing);
    }

    return await this.prisma.user.update({
      where: { id: id },
      data: req,
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: password,
        cdt: true,
      },
    });
  }

  async delete(id: number): Promise<UserResponse> {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
