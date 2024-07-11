import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  pseudo: string;
}
