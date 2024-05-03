import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class Pagination {
  @ApiProperty({
    default: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    default: 10,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    default: 'asc',
    required: false,
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc' = 'asc';

  @ApiProperty({
    required: false,
    example: 'id,cdt',
  })
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => (value ? value.split(',') : []))
  @IsArray()
  @IsString({ each: true })
  sort_fields?: string[];

  data() {
    return {
      take: this.limit,
      skip: this.page,
      orderBy: this.sort_fields?.map((field) => {
        return {
          [field]: this.sort,
        };
      }),
    };
  }
}
