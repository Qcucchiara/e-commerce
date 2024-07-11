import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CategoryDto) {
    return this.prisma.category.create({ data: { ...dto } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id: id } });
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
