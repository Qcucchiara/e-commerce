import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../utils/types';

export class UpdateOrderstatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: string;
}

export class UpdateOrderHasProductQuantityDto {
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}