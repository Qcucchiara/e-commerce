import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pagination } from 'src/utils/DTO/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CategoryDto, file: Express.Multer.File) {
    return this.prisma.category.create({
      data: { ...dto, slug: dto.name.toLowerCase(), image: file.filename },
    });
  }

  async findAll(query: Pagination) {
    if (!query.skip || !query.take) {
      throw new HttpException(
        'query param missing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const findMany = await this.prisma.category.findMany({
      skip: parseInt(query.skip),
      take: parseInt(query.take),
    });
    return { total: findMany.length, data: findMany };
  }

  findOne(param: string) {
    return this.prisma.category.findFirst({
      where: { OR: [{ id: param }, { slug: param }] },
      include: {
        Product_Has_Category: {
          include: {
            product: {
              include: {
                Product_Has_Category: { include: { category: true } },
              },
            },
          },
        },
      },
    });
  }

  update(id: string, dto: CategoryDto) {
    return this.prisma.category.update({
      where: { id: id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id: id } });
  }
}
