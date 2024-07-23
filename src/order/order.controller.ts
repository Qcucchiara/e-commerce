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
import { OrderService } from './order.service';
import { InitOrderDto, InitOrderHasProductDto } from './dto/init.order.dto';
import { OrderHasProductService } from './order_has_product.service';
import {
  UpdateOrderHasProductQuantityDto,
  UpdateOrderstatusDto,
} from './dto/update.order.dto';
import { JwtGuard } from 'src/auth/guards';
import { query } from 'express';
import { Pagination } from 'src/utils/DTO/pagination.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderHasProductService: OrderHasProductService,
  ) {}

  @Post()
  createEmptyOrder(@GetUser() user: User) {
    return this.orderService.create(user);
  }

  @Post('/element')
  createOrderElement(
    @Body() dto: InitOrderHasProductDto,
    @GetUser() user: User,
  ) {
    return this.orderHasProductService.create(dto, user);
  }

  @Get()
  findAll(@Query() query: Pagination) {
    return this.orderService.findAll(query);
  }

  @Get('/user')
  findManyFromUser(@GetUser() user: User, @Query() query: Pagination) {
    return this.orderService.findManyFromUser(query, user);
  }

  @Get('/one/:orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.orderService.findOne(orderId);
  }

  @Patch('/status/:id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderstatusDto,
  ) {
    return this.orderService.updateOrderStatus(id, dto);
  }

  @Patch('/element/:id/quantity')
  updateElementQuantity(
    @Param('id') id: string,
    @Body() dto: UpdateOrderHasProductQuantityDto,
  ) {
    return this.orderHasProductService.update(id, dto);
  }

  @Delete('/element/:id')
  removeElement(@Param('id') id: string) {
    return this.orderHasProductService.remove(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
