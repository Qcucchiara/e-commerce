import {
  IsInt,
  IsNotEmpty,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class InitProductDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(12)
  name: string;

  @IsNotEmpty()
  image: any;

  @IsNotEmpty()
  @MinLength(15)
  @MaxLength(80)
  description: string;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Min(0)
  @IsInt()
  stock: number;

  @Min(0)
  @Max(1)
  promo: number;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;
}
