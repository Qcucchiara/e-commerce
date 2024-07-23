import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { InitProductDto } from './dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Pagination } from 'src/utils/DTO/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/product',
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
  create(@Body() dto: InitProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll(@Query() query: Pagination) {
    return this.productService.findAll(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.productService.findOne(param);
  }

  @Get('/cart/:id')
  findOneJoinCart(@Param('id') id: string) {
    return this.productService.findOneJoinCart(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
