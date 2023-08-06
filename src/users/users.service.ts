import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/users-dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: number, password = false) {
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

  async findByEmail(email: string, password = false) {
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

  async create(req: CreateUserDto, password = false) {
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

  async update(id: number, req: UpdateUserDto, password = false) {
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

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
