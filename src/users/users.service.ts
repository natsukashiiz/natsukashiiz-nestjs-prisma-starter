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

  async findById(id: number, selectPassword = false): Promise<UserResponse> {
    return await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: selectPassword,
        cdt: true,
      },
    });
  }

  async findByEmail(
    email: string,
    selectPassword = false,
  ): Promise<UserResponse> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: selectPassword,
        cdt: true,
      },
    });
  }

  async create(
    req: UserRequest,
    selectPassword = false,
  ): Promise<UserResponse> {
    req.password = await bcrypt.hash(req.password, roundsOfHashing);
    return await this.prisma.user.create({
      data: req,
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        password: selectPassword,
        cdt: true,
      },
    });
  }

  async update(
    id: number,
    req: UserUpdate,
    selectPassword = false,
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
        password: selectPassword,
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
