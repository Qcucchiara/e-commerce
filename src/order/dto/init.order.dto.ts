import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class InitOrderHasProductDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}

export class InitOrderDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  // @IsArray()
  // @ArrayMinSize(1)
  // @ValidateNested({ each: true })
  // @Type(() => InitOrderHasProductDto)
  // arrayProduct: InitOrderHasProductDto[];
}
