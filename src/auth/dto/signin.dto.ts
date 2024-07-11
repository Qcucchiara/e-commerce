import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  credential: string;

  @IsNotEmpty()
  password: string;
}
