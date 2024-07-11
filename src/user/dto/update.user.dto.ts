import { MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(2)
  @MaxLength(40)
  first_name: string;

  @MinLength(2)
  @MaxLength(40)
  last_name: string;

  @MinLength(3)
  @MaxLength(12)
  pseudo: string;

  avatar: any;
}
