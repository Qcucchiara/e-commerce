import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  confirmPassword: string;
}
