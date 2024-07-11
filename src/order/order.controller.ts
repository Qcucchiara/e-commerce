import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { InitOrderDto, InitOrderHasProductDto } from './dto/init.order.dto';
import { OrderHasProductService } from './order_has_product.service';
import {
  UpdateOrderHasProductQuantityDto,
  UpdateOrderstatusDto,
} from './dto/update.order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderHasProductService: OrderHasProductService,
  ) {}

  @Post()
  createEmptyOrder(@Body() dto: InitOrderDto) {
    return this.orderService.create(dto);
  }

  @Post('/element')
  createOrderElement(@Body() dto: InitOrderHasProductDto) {
    return this.orderHasProductService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/:orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.orderService.findOne(orderId);
  }

  @Patch('/status/:id')
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
