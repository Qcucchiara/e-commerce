import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // create(dto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return this.prisma.user.findMany({ include: { role: true } });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async updateRole(idUser: string, idRole: string) {
    return this.prisma.user
      .update({
        where: { id: idUser },
        data: { role_id: idRole },
      })
      .catch((error) => {
        throw new UnprocessableEntityException();
      });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
