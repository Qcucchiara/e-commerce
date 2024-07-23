import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InitOrderHasProductDto } from './dto/init.order.dto';
import { UpdateOrderHasProductQuantityDto } from './dto/update.order.dto';
import { User } from '@prisma/client';

@Injectable()
export class OrderHasProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: InitOrderHasProductDto, user: User) {
    await this.prisma.order.update({
      where: { id: dto.order_id },
      data: { status: 'pending' },
    });
    const newElement = await this.prisma.order_has_Product.create({
      data: {
        product_id: dto.product_id,
        order_id: dto.order_id,
        quantity: dto.quantity,
      },
    });

    if (newElement) {
      await this.prisma.user_Has_Product.delete({
        where: {
          id: dto.cartElement_id,
        },
      });
      throw new HttpException('everything is good', HttpStatus.CREATED);
    }
    return;
  }

  update(id: string, dto: UpdateOrderHasProductQuantityDto) {
    return this.prisma.order_has_Product.update({
      where: { id: id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.order_has_Product.delete({ where: { id: id } });
  }
}
