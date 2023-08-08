import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SignHistoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.signHistory.findMany();
  }

  async findByUid(uid: number) {
    return await this.prisma.signHistory.findMany({
      where: {
        uid: uid,
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

  async countByUid(uid: number) {
    return await this.prisma.signHistory.count({
      where: {
        uid: uid,
      },
    });
  }

  async create(req: Prisma.SignHistoryUncheckedCreateInput) {
    return await this.prisma.signHistory.create({
      data: req,
    });
  }
}
