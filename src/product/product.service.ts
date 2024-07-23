import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update.product.dto';
import { InitProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
import { Pagination } from 'src/utils/DTO/pagination.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: InitProductDto) {
    // const selectedCategory = await this.prisma.category.findUnique({
    //   where: { id: dto.category_id },
    // });

    // if (!selectedCategory) {
    //   throw new NotFoundException('category does not exist');
    // }

    // return this.prisma.product.create({ data: { ...dto } });

    const findProduct = await this.prisma.product.findUnique({
      where: { name: dto.name },
    });

    if (findProduct)
      throw new ForbiddenException(
        'product already exist, either delete or update the previous one',
      );

    const createdProduct = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.name.toLowerCase(),
        image: dto.image,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        promo: dto.promo,
      },
    });

    for (const category_id of dto.categories_ids) {
      const selectedCategory = await this.prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!selectedCategory) {
        throw new NotFoundException('category does not exist');
      }

      await this.prisma.product_Has_Category.create({
        data: {
          product_id: createdProduct.id,
          category_id: category_id,
        },
      });
    }
    return 'product created';
  }

  async findAll(query: Pagination) {
    if (!query.skip || !query.take) {
      throw new HttpException(
        'query param missing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const findMany = await this.prisma.product.findMany({
      skip: parseInt(query.skip),
      take: parseInt(query.take),
      include: {
        Product_Has_Category: { include: { category: true } },
        _count: { select: { Order_has_Product: true } },
      },
    });
    return { total: findMany.length, data: findMany };
  }

  async findOne(param: string) {
    const foundProduct = await this.prisma.product.findFirst({
      where: { OR: [{ id: param }, { slug: param }] },
      include: { Product_Has_Category: { include: { category: true } } },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    return foundProduct;
  }

  async findOneJoinCart(id: string) {
    const foundProduct = await this.prisma.product.findFirst({
      where: { id: id },
      include: { User_Has_Product: true },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    return foundProduct;
  }

  async update(id: string, dto: UpdateProductDto) {
    const foundProduct = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!foundProduct) throw new NotFoundException('product does not exist');

    for (const category_id of dto.categories_ids) {
      const selectedCategory = await this.prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!selectedCategory) {
        throw new NotFoundException('category does not exist');
      }

      await this.prisma.product_Has_Category.create({
        data: {
          product_id: id,
          category_id: category_id,
        },
      });
    }
    return this.prisma.product.update({
      where: { id: id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        promo: dto.promo,
      },
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
