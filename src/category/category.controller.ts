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
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards';
import { Pagination } from 'src/utils/DTO/pagination.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/category',
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
  create(@Body() dto: CategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.categoryService.create(dto, file);
  }

  @Get()
  findAll(@Query() query: Pagination) {
    return this.categoryService.findAll(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.categoryService.findOne(param);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
