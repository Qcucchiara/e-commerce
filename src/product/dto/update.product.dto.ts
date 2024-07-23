import {
  IsArray,
  IsInt,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @MinLength(2)
  @MaxLength(12)
  name: string;

  image: any;

  @MinLength(15)
  @MaxLength(80)
  description: string;

  @Min(0)
  price: number;

  @Min(0)
  @IsInt()
  stock: number;

  @Min(0)
  @Max(1)
  promo: number;

  @IsUUID()
  @IsArray()
  categories_ids: string[];
}
