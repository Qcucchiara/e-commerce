import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';
import { ImageModule } from './image/image.module';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    PrismaModule,
    OrderModule,
    ReviewModule,
    AuthModule,
    EmailModule,
    ImageModule,
    CartModule,
    RoleModule,
  ],
})
export class AppModule {}
