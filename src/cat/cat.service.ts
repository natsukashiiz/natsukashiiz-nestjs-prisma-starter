import {
  BadGatewayException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(createCatDto: CreateCatDto) {
    return new this.catModel(createCatDto).save();
  }

  findAll() {
    return this.catModel.find().exec();
  }

  async findOne(id: string) {
    const result = await this.catModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    await this.validateId(id);
    return this.catModel.findByIdAndUpdate(id, updateCatDto).exec();
  }

  async remove(id: string) {
    await this.validateId(id);

    const deleted = await this.catModel.deleteOne({ _id: id }).exec();
    if (deleted.deletedCount === 0) {
      throw new HttpException('Failed to delete', 502);
    }
  }

  private async validateId(id: string) {
    const result = await this.catModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException();
    }
  }
}
