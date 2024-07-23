import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddElementToCart } from './dto/create-cart.dto';
import { UpdateQuantity } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pagination } from 'src/utils/DTO/pagination.dto';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(dto: AddElementToCart, user: { id: string }) {
    if (!dto.product_id || !dto.quantity || dto.quantity < 1) {
      throw new HttpException(
        'wrong data in the body',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const existingProduct = await this.prisma.product.findUnique({
      where: {
        id: dto.product_id,
      },
    });

    if (!existingProduct) {
      throw new HttpException(
        'product does not exist',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const existingElement = await this.prisma.user_Has_Product.findFirst({
      where: { user_id: user.id, product_id: dto.product_id },
    });

    if (existingElement) {
      const increaseQuantity = await this.prisma.user_Has_Product.update({
        where: { id: existingElement.id },
        data: { quantity: existingElement.quantity + 1 },
      });
      if (increaseQuantity) {
        throw new HttpException(
          {
            message:
              'element with the two same foreign keys already exist, increase the quantity instead',
            data: increaseQuantity,
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'element with the two same foreign keys already exist, could not increase the quantity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const newElement = await this.prisma.user_Has_Product.create({
      data: {
        user_id: user.id,
        product_id: dto.product_id,
        quantity: dto.quantity,
      },
    });
    if (newElement) {
      throw new HttpException(
        { message: 'cart element created', data: newElement },
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'cart element not created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query: Pagination, user: User) {
    if (!query.skip || !query.take) {
      throw new HttpException(
        'query param missing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.prisma
      .$transaction([
        this.prisma.user_Has_Product.count({
          where: { user_id: user.id },
        }),
        this.prisma.user_Has_Product.findMany({
          skip: parseInt(query.skip),
          take: parseInt(query.take),
          where: { user_id: user.id },
          // include: { product: true }, le include ne marche pas dans le $transaction
        }),
      ])
      .catch((error) => {
        throw new HttpException(error, HttpStatus.FAILED_DEPENDENCY);
      });
  }

  async update(id: string, dto: UpdateQuantity) {
    if (!dto.quantity) {
      throw new HttpException(
        'wrong data in the body',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const foundItem = await this.prisma.user_Has_Product.findUnique({
      where: { id: id },
    });

    if (!foundItem) {
      throw new HttpException('cart item not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.user_Has_Product
      .update({
        where: { id: id },
        data: { quantity: dto.quantity },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    return this.prisma.user_Has_Product
      .delete({
        where: { id: id },
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }
}
