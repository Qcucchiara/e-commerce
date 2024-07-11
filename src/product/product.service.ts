import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update.product.dto';
import { InitProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: InitProductDto) {
    const selectedCategory = await this.prisma.category.findUnique({
      where: { id: dto.category_id },
    });

    if (!selectedCategory) {
      throw new NotFoundException('category does not exist');
    }

    return this.prisma.product.create({ data: { ...dto } });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async findOne(id: string) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id: id },
      include: { category: true },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    return foundProduct;
  }

  async update(id: string, dto: UpdateProductDto) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    const selectedCategory = await this.prisma.category.findUnique({
      where: { id: dto.category_id },
    });

    if (!selectedCategory) {
      throw new NotFoundException('category does not exist');
    }

    return this.prisma.product.update({
      where: { id: id },
      data: { ...dto },
    });
  }

  async remove(id: string) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    return this.prisma.product.delete({ where: { id: id } });
  }
}
