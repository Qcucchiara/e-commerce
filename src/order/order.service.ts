import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InitOrderDto } from './dto/init.order.dto';
import { UpdateOrderstatusDto } from './dto/update.order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pagination } from 'src/utils/DTO/pagination.dto';
import { User } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(user: User) {
    let status: string = 'ok';

    const curentOrder = await this.prisma.order.create({
      data: { user_id: user.id, status: 'empty' },
    });
    curentOrder;
    return curentOrder.id;
  }

  async findAll(query: Pagination) {
    if (!query.skip || !query.take) {
      throw new HttpException(
        'query param missing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const findMany = await this.prisma.order.findMany({
      skip: parseInt(query.skip),
      take: parseInt(query.take),
      include: {
        user: true,
        Order_has_Product: { include: { product: true } },
      },
    });
    return { total: findMany.length, data: findMany };
  }

  async findManyFromUser(query: Pagination, user: User) {
    return this.prisma.order.findMany({
      skip: parseInt(query.skip),
      take: parseInt(query.take),
      where: { user_id: user.id },
      include: { Order_has_Product: { include: { product: true } } },
    });
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
    return this.prisma.order.delete({ where: { id: id } }).catch(() => {
      throw new NotFoundException(`User with ID ${id} not found`);
    });
  }
}
