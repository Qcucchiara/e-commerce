import { PrismaClient, User } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { Role } from './Types/enums';

const prisma = new PrismaClient();

export async function checkUserIsAuthorOrAdmin(
  user: User,
  entityUserId: string,
) {
  const findUser = await prisma.role.findUnique({
    where: { id: user.role_id },
  });

  if (user.id !== entityUserId && findUser.role !== Role.ADMIN) {
    throw new ForbiddenException(
      'Admin role or author authentication is needed',
    );
  }
}
