import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderHasProductService } from './order_has_product.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderHasProductService],
})
export class OrderModule {}
