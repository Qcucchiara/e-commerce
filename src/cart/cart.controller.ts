import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddElementToCart, UpdateQuantity } from './dto';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Pagination } from 'src/utils/DTO/pagination.dto';
import { query } from 'express';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() dto: AddElementToCart, @GetUser() user: User) {
    return this.cartService.create(dto, user);
  }

  @Get()
  findAll(@Query() query: Pagination, @GetUser() user: User) {
    return this.cartService.findAll(query, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuantity) {
    return this.cartService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
