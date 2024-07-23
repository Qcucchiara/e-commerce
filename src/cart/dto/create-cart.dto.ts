import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class AddElementToCart {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  quantity: number;
}
