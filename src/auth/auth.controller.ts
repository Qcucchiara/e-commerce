import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'uploads/avatar',
        filename: (req, file, callback) => {
          const imageName = file.originalname.split('.');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${imageName[0]}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  signup(@Body() dto: SignupDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.signup(dto, file);
  }

  @Post('/signin')
  @HttpCode(200)
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Post('/validate/:token')
  validateToken(@Param('token') token: string) {
    return this.authService.validateAccount(token);
  }
}
