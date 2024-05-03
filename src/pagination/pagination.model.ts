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
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc' = 'asc';

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
      orderBy: this.sort_fields.map((field) => {
        return {
          [field]: this.sort,
        };
      }),
    };
  }
}
