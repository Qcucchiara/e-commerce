import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  name: string;

  @IsNotEmpty()
  image: any;
}
