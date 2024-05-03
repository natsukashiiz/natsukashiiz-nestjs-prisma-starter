import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Pagination } from 'src/pagination/pagination.model';

@Injectable()
export class SignHistoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.signHistory.findMany();
  }

  async findByUid(uid: number) {
    return await this.prisma.signHistory.findMany({
      where: {
        uid,
      },
      select: {
        device: true,
        ip: true,
        cdt: true,
      },
      orderBy: {
        cdt: 'desc',
      },
    });
  }

  async findByUidAndPagination(uid: number, pagination: Pagination) {
    return await this.prisma.signHistory.findMany({
      where: {
        uid,
      },
      select: {
        id: true,
        device: true,
        ip: true,
        cdt: true,
      },
      ...pagination.data(),
    });
  }

  async countByUid(uid: number) {
    return await this.prisma.signHistory.count({
      where: {
        uid,
      },
    });
  }

  async create(req: Prisma.SignHistoryUncheckedCreateInput) {
    return await this.prisma.signHistory.create({
      data: req,
    });
  }
}
