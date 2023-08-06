import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, SignHistory } from '@prisma/client';

@Injectable()
export class SignHistoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.signHistory.findMany();
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
