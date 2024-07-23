import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class UpdateQuantity {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;
}
