import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InitOrderHasProductDto } from './dto/init.order.dto';
import { UpdateOrderHasProductQuantityDto } from './dto/update.order.dto';

@Injectable()
export class OrderHasProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: InitOrderHasProductDto) {
    await this.prisma.order.update({
      where: { id: dto.order_id },
      data: { status: 'pending' },
    });
    return this.prisma.order_has_Product.create({
      data: { ...dto },
    });
  }

  findAll() {
    return `This action returns all orderHasProduct`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orderHasProduct`;
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
