import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InitOrderDto, InitOrderHasProductDto } from './dto/init.order.dto';
import { UpdateOrderstatusDto } from './dto/update.order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderHasProductService } from './order_has_product.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private readonly orderHasProduct: OrderHasProductService,
  ) {}

  async createEmptyOrder(dto) {
    const createdOrder = await this.prisma.order.create({ data: { ...dto } });

    if (!createdOrder)
      throw new UnprocessableEntityException(
        'the order was not created correctly. please verify the request',
      );

    return createdOrder;
  }

  async createOrderHasProduct(order_id: string, dto) {
    const selectedOrder = await this.prisma.order.findUnique({
      where: { id: order_id },
    });
    if (!selectedOrder) {
      throw new NotFoundException('the order selected was not found');
    }

    return selectedOrder;
  }

  async create(dto: InitOrderDto) {
    let status: string = 'ok';

    const curentOrder = await this.prisma.order.create({
      data: { user_id: dto.user_id, status: 'empty' },
    });
    curentOrder;
    return curentOrder.id;
  }

  findAll() {
    return this.prisma.order.findMany({ include: { Order_has_Product: true } });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  updateOrderStatus(id: string, dto: UpdateOrderstatusDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.order.delete({ where: { id: id } });
  }
}
